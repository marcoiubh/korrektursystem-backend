const _ = require('lodash');
const express = require('express');
const router = express.Router();
const getUserByEmail = require('../middleware/getUserByEmail');
const validatePassword = require('../middleware/validatePassword');
const generateAuthToken = require('../middleware/generateAuthToken');

// login
router.post(
  '/',
  [getUserByEmail, validatePassword, generateAuthToken],
  async (req, res) => {
    // escape output
    res.json(_.escape(req.token));
  }
);

module.exports = router;
