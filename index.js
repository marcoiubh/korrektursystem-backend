// create express object called app
const express = require('express');
app = express();

// import loggers
const debug = require('debug')('error');
const morganBody = require('morgan-body');

// run startup procedure
require('./services/checkPrivateKeys')();
require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/startServer')(app);

module.exports = app;
