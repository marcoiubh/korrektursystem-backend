const jwt = require('jsonwebtoken');
const config = require('config');

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
    const decodedPayload = jwt.verify(
      token,
      config.get('jwtPrivateKey')
    );
    // returns the payload passed to token generator -> user._id, user.name etc.
    req.user = decodedPayload;
    next();
  } catch (exception) {
    res.status(400).send('Invalid token.');
  }
};
