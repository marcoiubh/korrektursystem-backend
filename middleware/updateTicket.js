const _ = require('lodash');
const Ticket = require('../models/ticket');

const updateTicket = async (req, res, next) => {
  try {
    let oldTicket = await Ticket.findOne({ _id: req.params.id });
    let newTicket = _.pick(req.body, [
      'date',
      'priority',
      'statement',
      'status',
      'readStudent',
      'readProfessor',
      'history',
    ]);

    // set an email flag only if statement, priority or status changed
    req.email = ticketContentChanged(oldTicket, newTicket);
    console.log(req.email);

    const ticket = Object.assign(oldTicket, newTicket);
    await ticket.save();
    req.ticket = ticket;
    next();
  } catch (error) {
    res.status(500).json('Internal server error.');
  }
};

// check if there are changes besides of read status
const ticketContentChanged = (oldTicket, newTicket) => {
  if (
    oldTicket.statement === newTicket.statement &&
    oldTicket.priority === newTicket.priority &&
    oldTicket.status === newTicket.status
  )
    // no changes means its a read status update only -> no email required
    return false;
  // if there are content changes return true
  else return true;
};

module.exports = updateTicket;
