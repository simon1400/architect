var mongoose = require('mongoose');

var MenuSchema = new mongoose.Schema({
  id: {type: Number, unique: true, default: 0},
  name: String
});

module.exports = mongoose.model('menus', MenuSchema);
