const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: String,
    date: String,
    priority: String,
    module: String,
    type: String,
    source: String,
    status: String,
    comment: String,
    statement: String,
  },
  { versionKey: false }
);

const Ticket = mongoose.model('Ticket', schema);

module.exports.Ticket = Ticket;
