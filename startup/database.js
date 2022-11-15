const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  // choosing database depends on the current environment
  // heroku sets NODE_ENV to 'production' automatically
  // /config/production.json must be set
  // visual code picks default.json
  const database = config.get('database');
  mongoose
    .connect(database)
    .then(() => console.log(`connected to ${database}`))
    .catch((error) =>
      console.error(`connection to ${database} failed`, error)
    );
};
