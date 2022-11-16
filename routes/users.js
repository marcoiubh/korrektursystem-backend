const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
// here it is all about authorization; does the user has access?
const authorization = require('../middleware/authentication');

// get the user from the token
// for security reasons use "me"
router.get('/me', authorization, async (req, res) => {
  // instead of sending information about the user,
  // it is extracted from the jwt
  // the password will be excluded!
  const user = await User.findById(req.user.email).select(
    '-password'
  );
  res.send(user);
});

// register a new user
router.post('/', async (req, res) => {
  // validate that user is unique
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registred.');

  // user = new User({ id: req.body.id, ...
  user = new User(
    _.pick(req.body, ['email', 'password', 'role', 'courses'])
  );

  // generate salt
  const salt = await bcrypt.genSalt(10);
  // generate hashed password
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // a user is logged in automatically, thus a token is generated
  const token = user.generateAuthToken();

  // store token in the response header
  // custom header names should be prefixed with an 'x-'
  // the second value is the header
  // this header value can be stored at the client and then be used for authentication
  res
    .setHeader('x-auth-token', token)
    .send(_.pick(user, ['email', 'role']));
});

module.exports = router;
