const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    comment: String,
    date: { type: Date, default: Date.now },
    module: String,
    priority: String,
    source: String,
    statement: String,
    status: String,
    student: String,
    title: String,
    type: String,
  },
  { versionKey: false }
);

const Ticket = mongoose.model('Ticket', schema);

module.exports.Ticket = Ticket;
