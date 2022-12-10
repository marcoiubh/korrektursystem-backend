const config = require('config');
const mongoose = require('mongoose');

module.exports = function () {
  // database depends on the current environment
  const database = config.get('database');
  mongoose
    .connect(database)
    .then(() => console.log(`connected to ${database}`))
    .catch((error) =>
      console.error(`connection to ${database} failed`, error)
    );
};
