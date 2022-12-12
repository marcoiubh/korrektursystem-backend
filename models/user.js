const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['student', 'professor'] },
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

module.exports.User = User;
