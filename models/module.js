const mongoose = require('mongoose');

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

const Module = mongoose.model('Module', schema);

module.exports.Module = Module;
