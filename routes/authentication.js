const _ = require('lodash');
const express = require('express');

const generateAuthToken = require('../middleware/generateAuthToken');
const getUserByEmail = require('../middleware/getUserByEmail');
const validatePassword = require('../middleware/validatePassword');

const Module = require('../models/module');

const router = express.Router();

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
