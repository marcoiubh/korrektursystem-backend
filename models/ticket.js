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
    readStudent: Boolean,
    readProfessor: Boolean,
    history: Array,
  },
  { versionKey: false }
);

const Ticket = mongoose.model('Ticket', schema);

// during tests the module gets reloaded, thus it has to be deleted first
if (mongoose.models.Ticket) {
  delete mongoose.models.Ticket;
}

module.exports.Ticket = Ticket;
