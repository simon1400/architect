var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  content: String,
  dateSent: Date
});

module.exports = mongoose.model('projects', ProjectSchema);
