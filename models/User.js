var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  googleId: String
});
module.exports = mongoose.model('users', UserSchema);
