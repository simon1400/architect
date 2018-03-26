var mongoose = require('mongoose');

var MenuSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('menus', MenuSchema);
