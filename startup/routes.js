const authentication = require('../routes/authentication');
const express = require('express');
const root = require('../routes/root');
const tickets = require('../routes/tickets');
const issue = require('../routes/issue');

module.exports = function (app) {
  app.use(express.json());
  app.use('/', root);
  app.use('/tickets', tickets);
  app.use('/authentication', authentication);
  app.use('/issue', issue);
};
