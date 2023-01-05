const mongoose = require('mongoose');

// declare document data structure
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'professor'],
      required: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
  },
  { versionKey: false }
);

// create an instance of this document
const User = mongoose.model('User', schema);

// during tests the module gets reloaded, thus it has to be deleted first
if (process.env.NODE_ENV === 'test') {
  if (mongoose.models.User) {
    delete mongoose.models.User;
  }
}
module.exports = User;
