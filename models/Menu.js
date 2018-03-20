var mongoose = require('mongoose');

var MenuSchema = new mongoose.Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model('menus', MenuSchema);
