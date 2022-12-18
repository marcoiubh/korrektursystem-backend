const mongoose = require('mongoose');

const Module = mongoose.model(
  'Module',
  new mongoose.Schema(
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
  )
);

module.exports = Module;
