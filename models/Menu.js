var mongoose = require('mongoose');

var MenuSchema = new mongoose.Schema({
  name: String,
  index: Number
});

module.exports = mongoose.model('menus', MenuSchema);
