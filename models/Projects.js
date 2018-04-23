var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  uniqID: String,
  title: String,
  content: String,
  column: Boolean,
  image: [],
  menuId: String,
  parentPage: String,
  dateSent: Date,
  index: Number
});

module.exports = mongoose.model('projects', ProjectSchema);
