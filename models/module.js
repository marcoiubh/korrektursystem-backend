const mongoose = require('mongoose');

// declare document data structure
const schema = new mongoose.Schema(
  {
    title: String,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { versionKey: false }
);

// create an instance of this document
const Module = mongoose.model('Module', schema);

// during tests the module gets reloaded, thus it has to be deleted first
if (process.env.NODE_ENV === 'test') {
  if (mongoose.models.Module) {
    delete mongoose.models.Module;
  }
}
module.exports = Module;
