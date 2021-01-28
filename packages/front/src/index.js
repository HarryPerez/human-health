import React from 'react';
import ReactDOM from 'react-dom';

import './config/i18n';
import './config/rollbar';
import './scss/application.scss';
import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
