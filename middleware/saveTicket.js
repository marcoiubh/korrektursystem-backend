const _ = require('lodash');
const Ticket = require('../models/ticket');

const saveTicket = async (req, res, next) => {
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
        'priority',
        'statement',
      ])
    );
    await ticket.save();
    req.ticket = ticket;
    next();
  } catch (error) {
    res.status(500).json('Internal Server Error.');
  }
};

module.exports = saveTicket;
