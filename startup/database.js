const config = require('config');
const mongoose = require('mongoose');

const errorlog = require('debug')('error');
const infolog = require('debug')('info');

mongoose.set('strictQuery', false);

module.exports = async () => {
  // database depends on current node environment
  const database = config.get('database');
  try {
    await mongoose.connect(database);
    infolog(`connected to ${database}`);
  } catch (error) {
    errorlog(`connection to ${database} failed`, error.message);
  }
};
