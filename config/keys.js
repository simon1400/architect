// keys.js - figure out what set of creditals to return
if(process.env.NODE_ENV === 'production') {
  module.exports = require('./dev');
} else {
  module.exports = require('./dev');
}
