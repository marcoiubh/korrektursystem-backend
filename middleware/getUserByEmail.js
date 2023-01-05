const User = require('../models/user');

const getUserByEmail = async (req, res, next) => {
  try {
    // validate that user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    // store user object in request
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid email or password.');
  }
};

module.exports = getUserByEmail;
