const User = require('../models/user');

const getUserByEmail = async (req, res, next) => {
  try {
    // validate that exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid email or password.');
  }
};

module.exports = getUserByEmail;
