const _ = require('lodash');
const { Ticket } = require('../models/ticket');

module.exports = async function (req, res, next) {
  try {
    let ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id },
      _.pick(req.body, [
        'date',
        'priority',
        'statement',
        'status',
        'readStudent',
        'readProfessor',
        'history',
      ]),
      { new: true }
    );
    req.ticket = ticket;
    next();
  } catch (error) {}
};
