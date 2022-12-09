const express = require('express');
const sendEmail = require('../services/emailService');
const router = express.Router();
const config = require('config');

router.post('/', (req, res) => {
  const { issue } = req.body;
  const emailText = `
    Date: ${req.body.date}
    Email: ${req.body.user}
    Issue: ${req.body.issue}
    Description: ${req.body.description}
  `;
  sendEmail(config.get('testReceiverEmail'), issue, emailText);
  res.json('Email has been sent.');
});
module.exports = router;
