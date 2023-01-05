const config = require('config');
const jwt = require('jsonwebtoken');

const generateAuthToken = (req, res, next) => {
  try {
    const { email, role } = req.user;
    const jwtPrivateKey = config.get('jwtPrivateKey');

    // id token requires the following data
    if (!email || !role || !jwtPrivateKey) {
      throw new Error();
    }

    // generate token with email, role and expiration time
    // signed with private key
    const token = jwt.sign(
      { email: email, role: role },
      config.get('jwtPrivateKey'),
      { expiresIn: '30m' }
    );

    // store token object in request
    req.token = token;
    next();
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = generateAuthToken;
