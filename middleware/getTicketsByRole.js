const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');

let find = {
  ticketsOfStudent: async (email) => {
    // only tickets originating from this specific student
    return await Ticket.find({ student: email });
  },

  emailToUser: async (email) => {
    // user1 -> module1, module2
    // user2 -> module3
    // return user with modules
    // find supervised modules
    const user = await User.findOne({
      email: email,
    }).populate('modules');
  },

  byModule: async (module) => {
    // module1 = [ticket1]
    // module2 = [ticket2]
    // module3 = [ticket3]
    return await Ticket.find({ module: module.title });

    // return tickets
  },
  allTickets: async (user) => {
    // user.modules -> to module!!
    return await Promise.all(
      user.modules.map(async (module) => {
        // wait for ticket to be fetched
        return await find.byModule(module);
      })
    );
  },
  ticketsOfProfessor: async (email) => {
    // user1, user2
    // find supervised modules
    const user = await find.emailToUser(email);
    // find tickets for each module
    if (!user) return;
    const ticketArray = await find.allTickets(user);
    // return ticketArray;

    // TODO: restructure
    const newArr = [];
    ticketArray.map((arr) => arr.map((a) => newArr.push(a)));
    return newArr;
    // return user
    // findAllTickets(user)
    // return tickets
  },
};

getTickets = async (req, res, next) => {
  const { role, email } = req.user;
  let ticket = {};

  if (role === 'student') {
    ticket = await find.ticketsOfStudent(email);
  } else if (role === 'professor') {
    ticket = await find.ticketsOfProfessor(email);
    // debug('ticket', ticket);
  }
  req.ticket = ticket;
  next();
};

module.exports = {
  getTickets,
  find,
};
