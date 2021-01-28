/* eslint-disable no-undef */
const sendMailMock = jest.fn().mockReturnValue(true);

jest.mock('nodemailer');

const nodemailer = require('nodemailer');

nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

module.exports = { sendMailMock, nodemailer };
