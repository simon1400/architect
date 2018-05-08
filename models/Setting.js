var mongoose = require('mongoose');

var SettingSchema = new mongoose.Schema({
  themeColor: String,
  favicon: {type: String, default: ''},
  description: {type: String, default: ''},
  title: {type: String, default: ''},
  namePage: {type: String, default: ''}
});

module.exports = mongoose.model('settings', SettingSchema);
