const bcrypt = require('bcrypt');

const validatePassword = async (req, res, next) => {
  try {
    const result = await bcrypt.compare(
      req.body.password,
      req.user.password
    );

    if (result === false) throw new Error();
    next();
    return result;
  } catch (error) {
    res.status(400).send('Invalid email or password.');
  }
};

module.exports = validatePassword;
