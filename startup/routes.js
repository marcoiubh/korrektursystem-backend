const express = require('express');
const authentication = require('../routes/authentication');
const issue = require('../routes/issue');
const tickets = require('../routes/tickets');

// application level middleware
module.exports = (app) => {
  app.use(express.json());
  app.use('/authentication', authentication);
  app.use('/issue', issue);
  app.use('/tickets', tickets);
};
