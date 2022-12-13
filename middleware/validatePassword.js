const bcrypt = require('bcrypt');

module.exports = async function (req, res, next) {
  // compare passwords
  await bcrypt
    .compare(req.body.password, req.user.password)
    .then((result) => {
      if (result) next();
      else throw new Error(error);
    })
    .catch(() => res.status(400).send('Invalid email or password.'));
};
