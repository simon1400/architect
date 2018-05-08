var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  uniqID: String,
  title: String,
  description: {type: String, default: ''},
  link: {type: String, default: ''},
  withoutLink: {type: Boolean, default: false},
  content: String,
  column: Boolean,
  image: [],
  menuId: String,
  parentPage: String,
  dateSent: Date,
  index: Number,
  visible: {type: Boolean, default: true}
});

module.exports = mongoose.model('projects', ProjectSchema);
