const config = require('config');
const mongoose = require('mongoose');
const debug = require('debug')('db');

mongoose.set('strictQuery', false);

module.exports = async () => {
  // database depends on the current node environment
  const database = config.get('database');
  try {
    await mongoose.connect(database);
    debug(`connected to ${database}`);
  } catch (error) {
    debug(`connection to ${database} failed`, error.message);
  }
};
