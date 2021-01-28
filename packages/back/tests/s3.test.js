/* eslint-disable no-undef */
/* eslint-disable global-require */

const { S3, getSignedUrlPromiseMock } = require('./mocks/s3');
const { authRequest, generateToken } = require('./helpers/request');
const { deleteDocumentsFrom } = require('./helpers/db');
const { MODELS } = require('./helpers/constants');
const { initDatabase, mongoose } = require('../src/db');

let token;

describe('S3 signed URL controller', () => {
  beforeAll(async () => {
    initDatabase();
    require('dotenv').config();
    await deleteDocumentsFrom(MODELS);
    token = await generateToken();
  });

  beforeEach(async () => {
    getSignedUrlPromiseMock.mockClear();
    S3.mockClear();
  });

  afterEach((async () => {
    await deleteDocumentsFrom(MODELS);
    token = await generateToken();
  }));
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('It should have called s3SignedUrl', async () => {
    const response = await authRequest(token, 'post', '/files/signed_url', { name: 'test', extension: 'png' });

    expect(getSignedUrlPromiseMock).toHaveBeenCalled();
    expect(response.body).toMatchObject({ url: 'test.com', fields: {} });
  });
});
