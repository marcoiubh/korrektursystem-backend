const _ = require('lodash');
const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');
const admin = require('../middleware/admin');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const sendEmail = require('../services/emailService');
const config = require('config');

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
  const { role, email } = req.user;
  let ticket = {};
  if (role === 'student') {
    // only tickets originating from this specific student
    ticket = await Ticket.find({ student: email });
  } else if (role === 'professor') {
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
  if (config.get('testEmail')) {
    const emailText = `
        ${ticket.student} has created a ticket.
        –––––––––––––––––––––––––––––––––––––––
        Module: ${ticket.module}
        Message: ${ticket.comment}
    `;
    sendEmail(config.get('email.professor'), ticket.title, emailText);
  }
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
  // set email confirmation based on config
  // avoid sending email when only read status has changed by checking statement
  if (config.get('testEmail') && ticket.statement) {
    const emailText = `
        Your ticket has been updated.
        –––––––––––––––––––––––––––––––––––––––
        Module: ${ticket.module}
        Message: ${ticket.statement}
    `;
    sendEmail(config.get('email.student'), ticket.title, emailText);
  }
  res.json(ticket);
});

router.delete('/:id', async (req, res) => {
  const ticket = await Ticket.deleteOne({ _id: req.params.id });
  res.json(ticket);
});

module.exports = router;
