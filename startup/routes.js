const authentication = require('../routes/authentication');
const express = require('express');
const root = require('../routes/root');
const tickets = require('../routes/tickets');
const users = require('../routes/users');

module.exports = function (app) {
  app.use(express.json());
  app.use('/', root);
  app.use('/tickets', tickets);
  app.use('/users', users);
  app.use('/authentication', authentication);
};
