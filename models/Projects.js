var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  // uniqID: { type: String, unique: true, sparse: true },
  title: String,
  content: String,
  namesImage: [],
  dateSent: Date
});

module.exports = mongoose.model('projects', ProjectSchema);
