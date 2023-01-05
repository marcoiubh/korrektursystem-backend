const config = require('config');
const jwt = require('jsonwebtoken');

const getTokenFromHeader = (req, res) => {
  try {
    // extract x-auth-token from header
    const token = req.header('x-auth-token');
    if (!token) throw 'exit';
    // store token in request
    req.token = token;
  } catch (error) {
    res.status(401).send('Access denied. No token provided.');
  }
};

const validateToken = (req, res, next) => {
  try {
    // get token from request and verify valid signature and expiration
    jwt.verify(
      req.token,
      config.get('jwtPrivateKey'),
      (err, decodedPayload) => {
        if (err) throw new Error(err);
        // store decoded payload in user object
        req.user = decodedPayload;
        next();
      }
    );
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const authorization = (req, res, next) => {
  getTokenFromHeader(req, res);
  validateToken(req, res, next);
};

module.exports = { authorization, validateToken, getTokenFromHeader };
