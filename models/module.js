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

// this is for mocha testing where we need to reload the model
// if (mongoose.models.Module) {
//   delete mongoose.models.Module;
// }
module.exports = Module;
