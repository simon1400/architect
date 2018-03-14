const mongoose = require('mongoose');
var multer   =  require( 'multer' );

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let type = file.originalname.split('.');
    cb(null, file.fieldname + '-' + Date.now() + '.' + type[type.length - 1])
  }
})

var upload   =  multer( { storage: storage } );

const Project = mongoose.model('projects');

module.exports = (app) => {
  app.post('/api/project', (req, res) => {
    const { content } = req.body;

    const project = new Project({
      content,
      // _user: req.user.id,
      dateSent: Date.now()
    })

    project.save()
    res.send(req.body)

  });

  app.post( '/api/image', upload.array('file', 12), function( req, res, next ) {
		console.log(req.files)
		res.end();
  });

}
