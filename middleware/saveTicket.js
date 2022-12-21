const _ = require('lodash');
const { Ticket } = require('../models/ticket');

module.exports = async function (req, res, next) {
  try {
    const ticket = new Ticket(
      _.pick(req.body, [
        'comment',
        'date',
        'module',
        'priority',
        'source',
        'status',
        'student',
        'title',
        'type',
        'readProfessor',
        'readStudent',
        'history',
      ])
    );
    await ticket.save();
    req.ticket = ticket;
    next();
  } catch (error) {
    res.status(500).json('Internal server error.');
  }
};
