const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs.js');
const { initDatabase } = require('./db');
const app = require('./app_builder');
require('./services/rollbar');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initDatabase();

module.exports = app;
