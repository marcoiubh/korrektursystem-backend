const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    comment: String,
    date: Date,
    module: String,
    priority: String,
    source: String,
    statement: String,
    status: String,
    student: String,
    professor: String,
    title: String,
    type: String,
  },
  { versionKey: false }
);

const Ticket = mongoose.model('Ticket', schema);

module.exports.Ticket = Ticket;
