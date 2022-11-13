const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

// each token must be regenerated after changes have been made
// to check the content of a token: jwt.io
const schema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: Boolean,
  roles: [],
  permittedOperations: [],
});

schema.methods.generateAuthToken = function () {
  // generate token with the following payload
  // jwt private key will be stored in an environment variable
  // include isAdmin property
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
};
const User = mongoose.model('User', schema);

module.exports.User = User;
