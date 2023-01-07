const _ = require('lodash');

const Ticket = require('../models/ticket');

const saveTicket = async (req, res, next) => {
  try {
    // pick parameters from request body and create ticket
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
    // save ticket to database
    await ticket.save();

    // save ticket in request
    req.ticket = ticket;
    next();
  } catch (error) {
    res.status(500).json('Internal Server Error.');
  }
};

module.exports = saveTicket;
