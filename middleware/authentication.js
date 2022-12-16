const config = require('config');
const jwt = require('jsonwebtoken');
const debug = require('debug')('error');

getTokenFromHeader = (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) throw 'exit';
    return token;
  } catch (error) {
    res.status(401).send('Access denied. No token provided.');
  }
};

validateToken = (token, res, req, next) => {
  try {
    jwt.verify(
      token,
      config.get('jwtPrivateKey'),
      (err, decodedPayload) => {
        if (err) throw new Error(err);
        // save user object with token payload
        req.user = decodedPayload;
        next();
      }
    );
  } catch (err) {
    if (err.message === 'TokenExpiredError: jwt expired') {
      res.status(401).send('Token expired.');
    } else if (err.message === 'JsonWebTokenError: invalid signature')
      res.status(400).send('Invalid email or password.');
    else debug(err.message);
  }
};

module.exports = function (req, res, next) {
  const token = getTokenFromHeader(req, res);
  validateToken(token, res, req, next);
};
