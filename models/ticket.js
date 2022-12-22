const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    module: {
      type: String,
      enum: [
        'BSTA01-01',
        'IOBP02',
        'IGIS01',
        'IREN01',
        'DLBINGE04',
        'ISPE01',
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: ['Critical', 'Major', 'Medium', 'Minor'],
    },

    source: {
      type: String,
      enum: ['Script', 'Vodcast', 'App', 'Excercises', 'OnlineQuiz'],
      required: true,
    },
    statement: String,
    status: {
      type: String,
      enum: ['Closed', 'Pending', 'In Progress', 'New'],
    },
    student: { type: String, required: true },
    professor: String,
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['Error', 'Proposal', 'Improvement', 'Notice'],
      required: true,
    },
    readStudent: Boolean,
    readProfessor: Boolean,
    history: Array,
  },
  { versionKey: false }
);

const Ticket = mongoose.model('Ticket', schema);

// during tests the module gets reloaded, thus it has to be deleted first
if (process.env.NODE_ENV === 'test') {
  if (mongoose.models.Ticket) {
    delete mongoose.models.Ticket;
  }
}
module.exports = Ticket;
