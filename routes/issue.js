const express = require('express');
const router = express.Router();
const { authorization } = require('../middleware/authorization');
const { issueCreated } = require('../middleware/sendConfirmation');

router.post('/', authorization, issueCreated, (req, res) => {
  res.json('Email has been sent.');
});

module.exports = router;
