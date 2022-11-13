const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  date: Date,
  priority: String,
  module: String,
  type: String,
  source: String,
  status: String,
  comment: String,
});

const Ticket = mongoose.model('Ticket', schema);

module.exports.Ticket = Ticket;
