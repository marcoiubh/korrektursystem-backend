const _ = require('lodash');
const express = require('express');
const router = express.Router();
const getUserByEmail = require('../middleware/getUserByEmail');
const validatePassword = require('../middleware/validatePassword');
const generateAuthToken = require('../middleware/generateAuthToken');
const Module = require('../models/module');

// login
router.post(
  '/',
  getUserByEmail,
  validatePassword,
  generateAuthToken,
  (req, res) => {
    // escape output to prevent xss attacks
    res.json(_.escape(req.token));
  }
);

module.exports = router;
