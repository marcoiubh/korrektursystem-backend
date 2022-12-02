const _ = require('lodash');
const Module = require('../models/module');
const { User } = require('../models/user');
const admin = require('../middleware/admin');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();

const addModuleToUser = function (userId, module) {
  return User.findByIdAndUpdate(
    userId,
    { $push: { modules: module._id } },
    { new: true, useFindAndModify: false }
  );
};

// const createModule = function (module) {
//   return Module.create(module).then((docModule) => {
//     return docModule;
//   });
// };

router.post('/new', async (req, res) => {
  const module = await createModule({ title: req.body.title });
  console.log(JSON.stringify(module));
  res.json(module);
});

router.post('/', async (req, res) => {
  // req body with moduleId and userId required
  const module = await Module.findById({ _id: req.body.moduleId });
  console.log(JSON.stringify(module));
  const user = await addModuleToUser(req.body.userId, module);
  res.json(user);
});

const getModuleWithPopulate = function (id) {
  return Module.findById(id).populate('users', '-_id -__v -modules');
};
// router.get('/:id', authentication, async (req, res) => {
//   const ticket = await Ticket.find({ _id: req.params.id });
//   res.json(ticket);
// });

// router.get('/', authentication, async (req, res) => {
//   // find tickets based on student email or role
//   let ticket = {};
//   if (req.query.student) {
//     ticket = await Ticket.find({ student: req.query.student });
//   } else if (req.query.professor) {
//     ticket = await Ticket.find();
//   }
//   res.json(ticket);
// });

// // authentication middleware protects routes

// // two middleware functions authentication, then check for admin
// // [authentication, admin],
// router.put('/:id', [authentication], async (req, res) => {
//   let ticket = await Ticket.findOneAndUpdate(
//     { _id: req.params.id },
//     _.pick(req.body, [
//       'comment',
//       'module',
//       'priority',
//       'source',
//       'statement',
//       'status',
//       'student',
//       'title',
//       'type',
//     ]),
//     { new: true }
//   );
//   res.json(ticket);
// });

// router.delete('/:id', async (req, res) => {
//   const ticket = await Ticket.deleteOne({ _id: req.params.id });
//   res.json(ticket);
// });

module.exports = router;
