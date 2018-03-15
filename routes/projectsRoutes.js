const mongoose = require('mongoose');
var multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/'+req.params.id
    mkdirp(dir, err => cb(null, dir))
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.');
    cb(null, file.fieldname + '-' + Date.now() + '.' + type[type.length - 1])
  }
})

var upload = multer( { storage: storage } );

const Project = mongoose.model('projects');

module.exports = (app) => {

  app.post( '/api/project/:id', upload.array('file', 12), function( req, res, next ) {

    const { title, content } = req.body;
    const namesImage = req.body.namesImage.split(',')
    const project = new Project({
      uniqID: req.params.id,
      title: title,
      content: content,
      namesImage: namesImage,
      dateSent: Date.now()
    })

    project.save(err => {
      console.log(err)
    })
    res.send(req.body)
  });

}
