const { User } = require('../models/user');

module.exports = async function (req, res, next) {
  try {
    // validate that exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error(error);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid email or password.');
  }
};
