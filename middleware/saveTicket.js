const _ = require('lodash');
const { Ticket } = require('../models/ticket');

module.exports = async function (req, res, next) {
  const ticket = new Ticket(
    _.pick(req.body, [
      'comment',
      'date',
      'module',
      'priority',
      'source',
      'student',
      'title',
      'type',
      'readProfessor',
      'readStudent',
    ])
  );
  await ticket.save();
  req.ticket = ticket;
  next();
};
