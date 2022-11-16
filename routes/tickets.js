const express = require('express');
const router = express.Router();
const { Ticket } = require('../models/ticket');
const authentication = require('../middleware/authentication');
const admin = require('../middleware/admin');

router.get('/', authentication, async (req, res) => {
  const tickets = await Ticket.find();
  res.send(tickets);
});

router.get('/:id', authentication, async (req, res) => {
  const ticket = await Ticket.find({ _id: req.params.id });
  res.json(ticket);
});

// authentication middleware protects routes

router.post('/', authentication, async (req, res) => {
  const ticket = new Ticket({
    title: req.body.title,
    date: req.body.date,
    priority: req.body.priority,
    module: req.body.module,
    type: req.body.type,
    source: req.body.source,
    status: req.body.status,
    comment: req.body.comment,
    statement: req.body.statement,
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
      title: req.body.title,
      date: req.body.date,
      priority: req.body.priority,
      module: req.body.module,
      type: req.body.type,
      source: req.body.source,
      status: req.body.status,
      comment: req.body.comment,
      statement: req.body.statement,
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
