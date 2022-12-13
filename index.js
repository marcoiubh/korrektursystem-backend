const express = require('express');
const checkPrivateKeys = require('./services/checkPrivateKeys');
const app = express();

// make sure environment variable is set or quit
try {
  checkPrivateKeys();
} catch (error) {
  console.log(error.message);
}

require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/startServer')(app);

module.exports = app;
