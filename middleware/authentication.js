const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    // returns the payload passed to token generator -> user._id
    req.user = decodedPayload;
    next();
  } catch (exception) {
    res.status(400).send("Invalid token.");
  }
};
