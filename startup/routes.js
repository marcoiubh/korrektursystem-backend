const express = require('express');
const tickets = require('../routes/tickets');
const root = require('../routes/root');
const users = require('../routes/users');
const authentication = require('../routes/authentication');

module.exports = function (app) {
  app.use(express.json());
  app.use('/', root);
  app.use('/tickets', tickets);
  app.use('/users', users);
  app.use('/authentication', authentication);
};
