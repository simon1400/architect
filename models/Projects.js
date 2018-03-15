var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  uniqID: String,
  title: String,
  content: String,
  namesImage: [String],
  dateSent: Date
});

module.exports = mongoose.model('projects', ProjectSchema);
