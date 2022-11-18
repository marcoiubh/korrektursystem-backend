const _ = require('lodash');
const { Ticket } = require('../models/ticket');
const admin = require('../middleware/admin');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();

router.get('/:id', authentication, async (req, res) => {
  const ticket = await Ticket.find({ _id: req.params.id });
  res.json(ticket);
});

router.get('/', authentication, async (req, res) => {
  // find tickets based on student email or role
  let ticket = {};
  if (req.query.student) {
    ticket = await Ticket.find({ student: req.query.student });
  } else if (req.query.professor) {
    ticket = await Ticket.find();
  }
  res.json(ticket);
});

// authentication middleware protects routes

router.post('/', authentication, async (req, res) => {
  const ticket = new Ticket(
    _.pick(req.body, [
      'comment',
      'module',
      'priority',
      'source',
      'statement',
      'status',
      'student',
      'title',
      'type',
    ])
  );
  await ticket.save();
  res.json(ticket);
});

// two middleware functions authentication, then check for admin
// [authentication, admin],
router.put('/:id', [authentication], async (req, res) => {
  let ticket = await Ticket.findOneAndUpdate(
    { _id: req.params.id },
    _.pick(req.body, [
      'comment',
      'module',
      'priority',
      'source',
      'statement',
      'status',
      'student',
      'title',
      'type',
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
