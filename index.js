// create express object called app
const express = require('express');

const app = express();

// run startup procedure
require('./services/checkPrivateKeys')();
require('./startup/cors')(app);
require('./startup/database')();
require('./startup/routes')(app);
require('./startup/startServer')(app);

module.exports = app;
