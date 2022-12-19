// const Module = require('../models/module');
const { authentication } = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const { getTickets } = require('../middleware/getTicketsByRole');
const saveTicket = require('../middleware/saveTicket');
const updateTicket = require('../middleware/updateTicket');
const sendConfirmation = require('../middleware/sendConfirmation');

// router level middleware
router.use(authentication);

// get all tickets based on role and email
router.get('/', [getTickets], (req, res) => {
  res.json(req.ticket);
});

// create a ticket
router.post(
  '/',
  [saveTicket, sendConfirmation.ticketCreated],
  (req, res) => {
    res.json(req.ticket);
  }
);

// update a ticket
router.put(
  '/:id',
  [updateTicket, sendConfirmation.ticketUpdated],
  (req, res) => {
    res.json(req.ticket);
  }
);

module.exports = router;
