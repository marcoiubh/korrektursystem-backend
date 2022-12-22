const _ = require('lodash');
const  Ticket  = require('../models/ticket');

const updateTicket = async (req, res, next) => {
  try {
    let ticket = await Ticket.findOne({ _id: req.params.id });
    let newFields = _.pick(req.body, [
      'date',
      'priority',
      'statement',
      'status',
      'readStudent',
      'readProfessor',
      'history',
    ]);
    ticket = Object.assign(ticket, newFields);
    await ticket.save();
    req.ticket = ticket;
    next();
  } catch (error) {
    res.status(500).json('Internal server error.');
  }
};

module.exports = updateTicket;
