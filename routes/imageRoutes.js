const mongoose = require('mongoose');
var multer = require('multer');
var mkdirp = require('mkdirp');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = 'client/public/images/'+req.params.id
    if(process.env.NODE_ENV === 'production'){
      dir = 'images/'+req.params.id
    }
    console.log('upload images in folder = ' + dir);
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

  app.put( '/api/image/:id', (req, res) => {
    const { image, uniqID, name } = req.body;
    if(req.params.id !== 'new'){
      const idNew = mongoose.Types.ObjectId(req.params.id);
      Project.findByIdAndUpdate(idNew, { image }, (err, item) => {
        if(err) console.error(err)
        res.send(item)
      })
    }
    let new_name = decodeURI(name)
    let deleteFile = `client/public/images/${uniqID}/${new_name}`
    if(process.env.NODE_ENV === 'production') deleteFile = `images/${uniqID}/${new_name}`
    fs.unlink(deleteFile, (err) => {
      if (err) throw err;
      console.log(deleteFile + ' was deleted');
    });
    if(req.params.id == 'new'){
      Project.find({}, (err, data) => {
        res.send(data)
      });
    }
  });
}
