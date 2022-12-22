const mongoose = require('mongoose');

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

const User = mongoose.model('User', schema);

// during tests the module gets reloaded, thus it has to be deleted first
if (mongoose.models.User) {
  delete mongoose.models.User;
}

module.exports = User;
