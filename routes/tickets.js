const Module = require('../models/module');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const getTicketsByRole = require('../middleware/getTicketsByRole');
const saveTicket = require('../middleware/saveTicket');
const updateTicket = require('../middleware/updateTicket');
const sendConfirmation = require('../middleware/sendConfirmation');

// get all tickets based on role and email
router.get('/', [authentication, getTicketsByRole], (req, res) => {
  res.json(req.ticket);
});

// create a ticket
router.post(
  '/',
  [authentication, saveTicket, sendConfirmation.ticketCreated],
  (req, res) => {
    res.json(req.ticket);
  }
);

// update a ticket
router.put(
  '/:id',
  [authentication, updateTicket, sendConfirmation.ticketUpdated],
  (req, res) => {
    res.json(req.ticket);
  }
);

module.exports = router;
