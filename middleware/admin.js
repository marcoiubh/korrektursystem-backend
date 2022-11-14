const config = require('config');

// will be executed after authentication middleware
module.exports = function (req, res, next) {
  // checks config if authentication is required
  // otherwise pass control to the next middleware
  if (!config.get('requiresAuthentication')) return next();
  // req.user has been already created by authentication middleware
  // 403 = forbidden, jwt is valid, but not allowed for access
  if (!req.user.isAdmin)
    return res.status(403).send('Access denied.');

  next();
};
