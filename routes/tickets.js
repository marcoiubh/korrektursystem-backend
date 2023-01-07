const express = require('express');

const { authorization } = require('../middleware/authorization');
const { getTickets } = require('../middleware/getTicketsByRole');
const saveTicket = require('../middleware/saveTicket');
const {
  ticketCreated,
  ticketUpdated,
} = require('../middleware/sendConfirmation');
const updateTicket = require('../middleware/updateTicket');

const router = express.Router();

// router level middleware
router.use(authorization);

// get all tickets based on role and email
router.get('/', getTickets, (req, res) => {
  res.json(req.tickets);
});

// create a ticket
router.post('/', saveTicket, ticketCreated, (req, res) => {
  res.json(req.ticket);
});

// update a ticket
router.put('/:id', updateTicket, ticketUpdated, (req, res) => {
  res.json(req.ticket);
});

module.exports = router;
