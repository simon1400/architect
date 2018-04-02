const mongoose = require('mongoose');
var multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'client/public/images/'+req.params.id
    mkdirp(dir, err => cb(null, dir))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer( { storage: storage } );

const Project = mongoose.model('projects');

module.exports = app => {
  app.post( '/api/image/:id', upload.array('file', 12), async (req, res) => res.send(req.body));
}
