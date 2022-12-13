const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');

findTicketsOfStudent = async (email) => {
  // only tickets originating from this specific student
  return await Ticket.find({ student: email });
};

findTicketsOfProfessor = async (email) => {
  // find supervised modules
  const user = await User.findOne({
    email: email,
  }).populate('modules');
  // find tickets for each module
  if (!user) return;
  const ticketArray = await findAllTickets(user);
  // console.log(ticketArray);
  // TODO: restructure
  const newArr = [];
  ticketArray.map((arr) => arr.map((a) => newArr.push(a)));
  return newArr;
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

module.exports = async function (req, res, next) {
  const { role, email } = req.user;
  let ticket = {};

  if (role === 'student') {
    ticket = await findTicketsOfStudent(email);
  } else if (role === 'professor') {
    ticket = await findTicketsOfProfessor(email);
  }
  req.ticket = ticket;
  next();
};
