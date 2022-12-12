const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const sendConfirmation = require('../middleware/sendConfirmation');

router.post(
  '/',
  [authentication, sendConfirmation.issueCreated],
  async (req, res) => {
    res.json('Email has been sent.');
  }
);
module.exports = router;
