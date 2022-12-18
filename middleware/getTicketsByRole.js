const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');
const debug = require('debug')('info');

findTicketsOfStudent = async (email) => {
  // only tickets originating from this specific student
  return await Ticket.find({ student: email });
};

findTicketsOfProfessor = async (email) => {
  // find supervised modules
  const user = await findWithModulesPopulated(email);
  // find tickets for each module
  if (!user) return;
  const ticketArray = await findAllTickets(user);

  // TODO: restructure
  const newArr = [];
  ticketArray.map((arr) => arr.map((a) => newArr.push(a)));
  return newArr;
};

findWithModulesPopulated = async (email) => {
  return await User.findOne({
    email: email,
  }).populate('modules');
};

findByModule = async (module) => {
  return await Ticket.find({ module: module.title });
};

findAllTickets = async (user) => {
  // wait until all tickets are fetched
  return await Promise.all(
    user.modules.map(async (module) => {
      // wait for ticket to be fetched
      return await findByModule(module);
    })
  );
};

getTicketsByMail = async (req, res, next) => {
  const { role, email } = req.user;
  let ticket = {};

  if (role === 'student') {
    ticket = await findTicketsOfStudent(email);
  } else if (role === 'professor') {
    ticket = await findTicketsOfProfessor(email);
    // debug('ticket', ticket);
  }
  req.ticket = ticket;
  next();
};

module.exports = {
  findWithModulesPopulated,
  findAllTickets,
  findTicketsOfProfessor,
  findTicketsOfStudent,
  getTicketsByMail,
  findByModule,
};
