const nodemailer = require('nodemailer');
const logger = require('../logger');

const createMailerTransport = () => nodemailer.createTransport({
  host: process.env.SMTP_ENDPOINT,
  port: process.env.SMTP_PORT,
  secureConnection: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/* eslint-disable no-unused-vars */
const sendEmail = async ({
  to, subject, raw, html,
}) => {
  const transporter = createMailerTransport();

  await transporter.sendMail({
    from: process.env.MAIL_SENDER,
    to,
    subject,
    text: raw,
    html,
  });

  logger.info('Mail sent to: %s', to);
};

module.exports = { sendEmail };
