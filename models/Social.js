var mongoose = require('mongoose');

var SocialSchema = new mongoose.Schema({
  name: String,
  classname: String,
  link: String
});

module.exports = mongoose.model('socials', SocialSchema);
