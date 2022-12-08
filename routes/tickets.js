const _ = require('lodash');
const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');
const admin = require('../middleware/admin');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();

// get ticket details
router.get('/:id', authentication, async (req, res) => {
  const ticket = await Ticket.find({ _id: req.params.id });
  res.json(ticket);
});

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

// get all tickets based on role and email
router.get('/', authentication, async (req, res) => {
  let ticket = {};
  if (req.user.role === 'student') {
    // only tickets originating from this specific student
    ticket = await Ticket.find({ student: req.user.email });
  } else if (req.user.role === 'professor') {
    // find supervised modules
    const user = await User.findOne({
      email: req.user.email,
    }).populate('modules');
    // find tickets for each module
    if (!user) return;
    const ticketArray = await findAllTickets(user);
    // console.log(ticketArray);
    // TODO: restructure
    const newArr = [];
    ticketArray.map((arr) => arr.map((a) => newArr.push(a)));
    ticket = newArr;
  }
  res.json(ticket);
});

// create a ticket
router.post('/', authentication, async (req, res) => {
  const ticket = new Ticket(
    _.pick(req.body, [
      'comment',
      'date',
      'module',
      'priority',
      'source',
      'student',
      'title',
      'type',
      'readProfessor',
      'readStudent',
    ])
  );
  await ticket.save();
  res.json(ticket);
});

// update a ticket
router.put('/:id', [authentication], async (req, res) => {
  let ticket = await Ticket.findOneAndUpdate(
    { _id: req.params.id },
    _.pick(req.body, [
      'date',
      'priority',
      'statement',
      'status',
      'readStudent',
      'readProfessor',
    ]),
    { new: true }
  );
  res.json(ticket);
});

router.delete('/:id', async (req, res) => {
  const ticket = await Ticket.deleteOne({ _id: req.params.id });
  res.json(ticket);
});

module.exports = router;
