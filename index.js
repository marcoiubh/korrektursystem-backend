// create express object called app
const express = require('express');
app = express();

// import loggers
const debug = require('debug')('error');
const morganBody = require('morgan-body');

// import function
const checkPrivateKeys = require('./services/checkPrivateKeys');

checkPrivateKeys();

require('./startup/cors')(app);
require('./startup/database')();
// morganBody(app);
require('./startup/routes')(app);
require('./startup/startServer')(app);

module.exports = app;
