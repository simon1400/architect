var mongoose = require('mongoose');

var SettingSchema = new mongoose.Schema({
  themeColor: String
});

module.exports = mongoose.model('settings', SettingSchema);
