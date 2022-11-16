const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: String,
  title: String,
});

const Course = mongoose.model('Course', schema);

module.exports.Course = Course;
