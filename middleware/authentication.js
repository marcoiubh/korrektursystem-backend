const config = require('config');
const jwt = require('jsonwebtoken');
const debug = require('debug')('error');

getTokenFromHeader = (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) throw 'exit';
    req.token = token;
  } catch (error) {
    res.status(401).send('Access denied. No token provided.');
    throw 401;
  }
};

validateToken = (req, res, next) => {
  try {
    jwt.verify(
      req.token,
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
    } else {
      debug(err.message);
      res.status(400).send(err.message);
    }
    throw err.message;
  }
};

authentication = (req, res, next) => {
  getTokenFromHeader(req, res);
  validateToken(req, res, next);
};

module.exports = {
  authentication,
  getTokenFromHeader,
  validateToken,
};
