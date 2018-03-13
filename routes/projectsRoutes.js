const mongoose = require('mongoose');
var multer   =  require( 'multer' );

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function(req, file, cb) {
		cb(null, file.filename);
	}
});

var upload   =  multer( { dest: 'uploads/' } );

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

  app.post( '/api/image', upload.single( 'file' ), function( req, res, next ) {

    console.log(req.file)

    if ( !req.file.mimetype.startsWith( 'image/' ) ) {
      return res.status( 422 ).json( {
        error : 'The uploaded file must be an image'
      } );
    }

    return res.status( 200 ).send( req.file );
  });

}
