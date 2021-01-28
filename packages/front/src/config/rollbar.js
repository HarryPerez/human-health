import Rollbar from 'rollbar';

export const rollbar =
  process.env.REACT_APP_ROLLBAR_TOKEN &&
  new Rollbar({
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true
  });
