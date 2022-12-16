const config = require('config');
const mongoose = require('mongoose');
const debug = require('debug')('db');

mongoose.set('strictQuery', false);

module.exports = function () {
  // database depends on the current environment
  const database = config.get('database');
  mongoose
    .connect(database)
    .then(() => debug(`connected to ${database}`))
    .catch((error) =>
      debug(`connection to ${database} failed`, error)
    );
};
