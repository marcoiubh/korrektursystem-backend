const Ticket = require('../models/ticket');
const User = require('../models/user');
const debug = require('debug')('info');

let find = {
  ticketsOfStudent: async (email) => {
    // only tickets originating from this specific student
    return await Ticket.find({ student: email });
  },

  userObjectByEmail: async (email) => {
    // return user with modules
    return await User.findOne({
      email: email,
    }).populate('modules');
  },

  byModule: async (module) => {
    return await Ticket.find({ module: module.title });
  },
  allTickets: async (user) => {
    // wait for each fetch to be done
    return await Promise.all(
      // check for tickets for each module of professor
      user.modules.map(async (module) => {
        // wait for ticket to be fetched
        return await find.byModule(module);
      })
    );
  },
  ticketsOfProfessor: async (email) => {
    // find supervised modules
    const user = await find.userObjectByEmail(email);
    // find tickets for each module
    if (!user) throw new Error();
    const ticketArray = await find.allTickets(user);
    // flatten arrays in array structure to one level
    return ticketArray.flat(1);
  },
};

const getTickets = async (req, res, next) => {
  const { role, email } = req.user;
  let ticket = {};

  try {
    // fetch tickets based on user role
    if (role === 'student') {
      ticket = await find.ticketsOfStudent(email);
    } else if (role === 'professor') {
      ticket = await find.ticketsOfProfessor(email);
    } else throw new Error('invalid role');
    req.ticket = ticket;
    next();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getTickets,
  find,
};
