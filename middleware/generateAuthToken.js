const config = require('config');
const jwt = require('jsonwebtoken');

const generateAuthToken = (req, res, next) => {
  try {
    const { email, role } = req.user;
    const jwtPrivateKey = config.get('jwtPrivateKey');
    if (!email || !role || !jwtPrivateKey) {
      throw new Error();
    }
    // generate token with the following payload
    // jwt private key will be stored in an environment variable
    // and must be set in heroku as config var as well!
    // terminal: export kms_jwtPrivateKey=
    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      config.get('jwtPrivateKey'),
      { expiresIn: '30m' }
    );

    req.token = token;
    next();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = generateAuthToken;
