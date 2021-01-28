const Rollbar = require('rollbar');

const rollbar = process.env.ROLLBAR_TOKEN && new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

module.exports = rollbar;
