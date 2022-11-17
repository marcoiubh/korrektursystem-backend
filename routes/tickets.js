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
  // database query with student email in header
  const ticket = await Ticket.find({ student: req.headers.student });
  res.json(ticket);
});

// authentication middleware protects routes

router.post('/', authentication, async (req, res) => {
  const ticket = new Ticket({
    comment: req.body.comment,
    date: req.body.date,
    module: req.body.module,
    priority: req.body.priority,
    source: req.body.source,
    statement: req.body.statement,
    status: req.body.status,
    student: req.body.student,
    title: req.body.title,
    type: req.body.type,
  });
  await ticket.save();
  res.json(ticket);
});

// two middleware functions authentication, then check for admin
// [authentication, admin],
router.put('/:id', [authentication], async (req, res) => {
  let ticket = await Ticket.findOneAndUpdate(
    { _id: req.params.id },
    {
      comment: req.body.comment,
      date: req.body.date,
      module: req.body.module,
      priority: req.body.priority,
      source: req.body.source,
      statement: req.body.statement,
      status: req.body.status,
      student: req.body.student,
      title: req.body.title,
      type: req.body.type,
    },
    { new: true }
  );
  res.json(ticket);
});

router.delete('/:id', async (req, res) => {
  const ticket = await Ticket.deleteOne({ _id: req.params.id });
  res.json(ticket);
});

module.exports = router;
