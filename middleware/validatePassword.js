const bcrypt = require('bcrypt');

module.exports = async function (req, res, next) {
  // compare passwords
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.user.password
    );

    if (result === false) throw new Error(error);
    next();
    return result;
  } catch (error) {
    res.status(400).send('Invalid email or password.');
    throw 400;
  }
};
