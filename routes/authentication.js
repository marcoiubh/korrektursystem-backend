const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// login
router.post('/', async (req, res) => {
  // validate that exists
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send('Invalid email or password.');

  // compare passwords
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validPassword)
    return res.status(400).send('Invalid email or password.');

  // generate a token
  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
