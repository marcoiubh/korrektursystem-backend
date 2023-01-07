const _ = require('lodash');

const Ticket = require('../models/ticket');

const updateTicket = async (req, res, next) => {
  try {
    // find ticket based on ticket id in url params
    let oldTicket = await Ticket.findOne({ _id: req.params.id });

    // pick new values from request body
    let newTicket = _.pick(req.body, [
      'date',
      'priority',
      'statement',
      'status',
      'readStudent',
      'readProfessor',
      'history',
    ]);

    // copy new fields to original ticket
    const ticket = Object.assign(oldTicket, newTicket);

    // save ticket to database
    await ticket.save();

    // save ticket in request
    req.ticket = ticket;

    // set an email flag only if statement, priority or status changed
    req.email = ticketContentChanged(oldTicket, newTicket);

    next();
  } catch (error) {
    res.status(500).json('Internal Server Error.');
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
