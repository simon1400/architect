var mongoose = require('mongoose');

var SocialSchema = new mongoose.Schema({
  image: String,
  link: String
});

module.exports = mongoose.model('socials', SocialSchema);
