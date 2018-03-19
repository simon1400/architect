var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  uniqID: String,
  title: String,
  content: String,
  image: [],
  dateSent: Date
});

module.exports = mongoose.model('projects', ProjectSchema);
