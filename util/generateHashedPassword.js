const bcrypt = require('bcrypt');

module.exports = async function (password) {
  // generate salt
  const salt = await bcrypt.genSalt(10);
  // generate hashed password
  hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
