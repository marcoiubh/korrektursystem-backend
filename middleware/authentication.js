const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // checks config if authentication is required
  // otherwise pass control to the next middleware
  if (!config.get('requiresAuthentication')) return next();

  // retrieve token from header
  const token = req.header('x-auth-token');
  if (!token)
    // 401 = unauthorized, user does not supply a valid jwt
    return res.status(401).send('Access denied. No token provided.');

  // validate token

  try {
    jwt.verify(
      token,
      config.get('jwtPrivateKey'),
      (err, decodedPayload) => {
        if (err) {
          throw new Error(err);
        }
        // returns the payload passed to token generator -> user._id, user.name etc.
        else {
          req.user = decodedPayload;
          next();
        }
      }
    );
  } catch (err) {
    if (err.message === 'TokenExpiredError: jwt expired') {
      res.status(401).send('Expired token.');
    } else res.status(400).send('Invalid token.');
  }
};
