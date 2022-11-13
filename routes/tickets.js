const express = require('express');
const router = express.Router();
const { Ticket } = require('../models/ticket');
const authentication = require('../middleware/authentication');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  const tickets = await Ticket.find();
  res.send(tickets);
});

router.get('/:id', async (req, res) => {
  const ticket = await Ticket.find({ _id: req.params.id });
  res.send(ticket);
});

// authentication middleware protects routes
// authentication
router.post('/', async (req, res) => {
  const ticket = new Ticket({
    _id: req.body._id,
    title: req.body.title,
    date: req.body.date,
    priority: req.body.priority,
    module: req.body.module,
    type: req.body.type,
    source: req.body.source,
    status: req.body.status,
  });
  await ticket.save();
  res.send(ticket);
});
// authentication
router.put('/:id', async (req, res) => {
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
    },
    { new: true }
  );
  res.send(ticket);
});

// two middleware functions authentication, then check for admin
// [authentication, admin],
router.delete('/:id', async (req, res) => {
  const ticket = await Ticket.deleteOne({ _id: req.params._id });
  res.send(ticket);
});

module.exports = router;
