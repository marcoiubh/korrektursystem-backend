const express = require('express');
const checkPrivateKeys = require('./services/checkPrivateKeys');
const app = express();
const debug = require('debug')('error');

// make sure environment variable is set or quit
try {
  checkPrivateKeys();
} catch (error) {
  debug(error.message);
}

require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/startServer')(app);

module.exports = app;
