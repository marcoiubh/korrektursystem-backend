const config = require('config');
const jwt = require('jsonwebtoken');

module.exports.generateAuthToken = function (req, res, next) {
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
};
