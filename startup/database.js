const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const database = config.get('database.development');
  mongoose
    .connect(database)
    .then(() => console.log(`connected to ${database}`))
    .catch((error) =>
      console.error(`connection to ${database} failed`, error)
    );
};
