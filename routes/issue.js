const express = require('express');

const { authorization } = require('../middleware/authorization');
const { issueCreated } = require('../middleware/sendConfirmation');

const router = express.Router();

router.post('/', authorization, issueCreated, (req, res) => {
  res.json('Email has been sent.');
});

module.exports = router;
