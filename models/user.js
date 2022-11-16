const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

// each token must be regenerated after changes have been made
// to check the content of a token: jwt.io
const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'professor'] },
  courses: [String],
  // isAdmin: Boolean,
  // permittedOperations: [],
});

schema.methods.generateAuthToken = function () {
  // generate token with the following payload
  // jwt private key will be stored in an environment variable
  // and must be set in heroku as config var as well!
  // terminal: export kms_jwtPrivateKey=
  return jwt.sign(
    { name: this.email, role: this.role },
    config.get('jwtPrivateKey')
  );
};
const User = mongoose.model('User', schema);

module.exports.User = User;
