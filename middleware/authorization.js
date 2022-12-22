const config = require('config');
const jwt = require('jsonwebtoken');
const debug = require('debug')('error');

const getTokenFromHeader = (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) throw 'exit';
    req.token = token;
  } catch (error) {
    res.status(401).send('Access denied. No token provided.');
    throw 401;
  }
};

const validateToken = (req, res, next) => {
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
    debug(err.message);
    res.status(401).send(err.message);
  }
};

const authorization = (req, res, next) => {
  getTokenFromHeader(req, res);
  validateToken(req, res, next);
};

module.exports = { authorization, validateToken, getTokenFromHeader };
