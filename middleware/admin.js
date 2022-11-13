// will be executed after authentication middleware
module.exports = function (req, res, next) {
  // req.user has been already created by authentication middleware
  // 401 vs 403:
  // 401 = unauthorized, user does not supply a valid jwt
  // 403 = forbidden, jwt is valid, but not allowed for access
  if (!req.user.isAdmin)
    return res.status(403).send('Access denied.');

  next();
};
