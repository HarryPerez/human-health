/* eslint-disable no-undef */
/* eslint-disable global-require */
const { sendMailMock, nodemailer } = require('./mocks/mailer');
const User = require('../src/models/users');
const { request, authRequest } = require('./helpers/request');
const { user } = require('./mocks/user');
const { createUser } = require('./factories/users');
const { deleteDocumentsFrom } = require('./helpers/db');
const { MODELS } = require('./helpers/constants');
const { encodePasswordChange: encode, encodeLogin } = require('../src/services/session');
const { initDatabase, mongoose } = require('../src/db');

describe('password', () => {
  beforeAll(async () => {
    require('dotenv').config();
    initDatabase();
    await deleteDocumentsFrom(MODELS);
  });
  beforeEach((done) => {
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
    done();
  });
  afterEach((async () => {
    await deleteDocumentsFrom(MODELS);
  }));
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('forgot password flow', () => {
    test('It should have a successful response updating password', async () => {
      await createUser();
      const response = await request()
        .post('/users/forgot_password')
        .send({ email: user.email });
      expect(response.statusCode).toBe(204);
      expect(sendMailMock).toHaveBeenCalled();
    });
    test('It should have a successful response email does not exist', async () => {
      const response = await request()
        .post('/users/forgot_password')
        .send({ email: 'asd@gmail.com' });
      expect(response.statusCode).toBe(204);
      expect(sendMailMock).not.toHaveBeenCalled();
    });
    test('It should fail when no email is sent', async () => {
      const response = await request()
        .post('/users/forgot_password')
        .send();
      expect(sendMailMock).not.toHaveBeenCalled();
      expect(response.statusCode).toBe(400);
      expect(response.body[0].message).toBe('email must be present and should be valid');
      expect(response.body[0].internal_code).toBe('0034');
    });
    test('It should fail with a bad formatted email', async () => {
      const response = await request()
        .post('/users/forgot_password')
        .send({ email: 'asdasdmail.com' });
      expect(sendMailMock).not.toHaveBeenCalled();
      expect(response.statusCode).toBe(400);
      expect(response.body[0].message).toBe('email must be present and should be valid');
      expect(response.body[0].internal_code).toBe('0034');
    });
  });
  describe('update password', () => {
    test('It should update password correctly', async () => {
      const newPassword = '1234Abcd';
      await createUser();
      const token = await encode(user.email);
      const response = await authRequest(token, 'post', '/users/password', { password: newPassword });
      expect(response.statusCode).toBe(201);
      expect(response.body.email).toBe(user.email);
      const signIn = await request()
        .post('/sign_in')
        .send({ email: user.email, password: newPassword });
      expect(signIn.statusCode).toBe(200);
      expect(signIn.body.expirationTime).toBe('1h');
    });
    test('It should update password correctly and set active in true for new user', async () => {
      const newPassword = '1234Abcd';
      await createUser({ ...user, email: 'new@zerf.com.ar', active: false });
      const token = await encode('new@zerf.com.ar');
      const response = await authRequest(token, 'post', '/users/password', { password: newPassword });
      expect(response.statusCode).toBe(201);
      expect(response.body.email).toBe('new@zerf.com.ar');
      const signIn = await request()
        .post('/sign_in')
        .send({ email: 'new@zerf.com.ar', password: newPassword });
      expect(signIn.statusCode).toBe(200);
      expect(signIn.body.expirationTime).toBe('1h');
      const dbUser = await User.findOne({ email: 'new@zerf.com.ar' });
      expect(dbUser.active).toBe(true);
    });
    test('It should update password correctly if admin', async () => {
      const newPassword = '1234Abcd';
      await createUser({ ...user, email: 'admin@admin.com', role: 'admin' });
      const token = await encode('admin@admin.com');
      const response = await authRequest(token, 'post', '/users/password', { password: newPassword });
      expect(response.statusCode).toBe(201);
      expect(response.body.email).toBe('admin@admin.com');
      const signIn = await request()
        .post('/sign_in')
        .send({ email: 'admin@admin.com', password: newPassword, admin: true });
      expect(signIn.statusCode).toBe(200);
      expect(signIn.body.expirationTime).toBe('1h');
    });
    test('It fail because of bad formed token: no token', async () => {
      await createUser();
      const response = await request()
        .post('/users/password').send({ password: '1234Abcd' });
      expect(response.statusCode).toBe(401);
      expect(response.body[0].message).toBe('No token was set');
      expect(response.body[0].internal_code).toBe('2000');
    });
    test('It fail because of bad formed token: no bearer', async () => {
      await createUser();
      const response = await request().post('/users/password').send({ password: '1234Abcd' }).set('authorization', 'asd asdasdasd');
      expect(response.statusCode).toBe(401);
      expect(response.body[0].message).toBe('Bad header token');
      expect(response.body[0].internal_code).toBe('2001');
    });
    test('It fail because of bad formed token: no email', async () => {
      await createUser();
      const token = await encode('fake@fake.com');
      const response = await request().post('/users/password').send({ password: '1234Abcd' }).set('authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(401);
      expect(response.body[0].message).toBe('No user found');
      expect(response.body[0].internal_code).toBe('2003');
    });
    test('It fail because of bad formed token: expired', async () => {
      await createUser();
      const token = await encode(user.email, 0);
      const response = await request().post('/users/password').send({ password: '1234Abcd' }).set('authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(401);
      expect(response.body[0].message).toBe('Token expired');
      expect(response.body[0].internal_code).toBe('2004');
    });
    test('It fail because of bad formed token: bad secret', async () => {
      await createUser();
      const token = await encodeLogin(user.email);
      const response = await request().post('/users/password').send({ password: '1234Abcd' }).set('authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
      expect(response.body[0].message).toBe('Bad token');
      expect(response.body[0].internal_code).toBe('2007');
    });
  });
});
