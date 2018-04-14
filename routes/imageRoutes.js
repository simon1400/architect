const mongoose = require('mongoose');
// const multer = require('multer');
// const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let dir = '/client/public/images/'+req.params.id
//     if(process.env.NODE_ENV === 'production'){
//       dir = '/client/images/'+req.params.id
//     }
//     mkdirp(dir, err => cb(null, dir))
//     // mkdirp(dir, function(err){console.error(err);})
//     console.log('upload images in folder = ' + dir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })
//
// let upload = multer( { storage: storage } );

const Project = mongoose.model('projects');

module.exports = app => {
  app.post( '/api/image/:id', (req, res) => {

    let dir = `${process.cwd()}/client/public/images/${req.params.id}`
    if(process.env.NODE_ENV === 'production') dir = `${process.cwd()}/client/build/images/${req.params.id}`

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    let thisFile;

    for (let key in req.files) {
      thisFile = req.files[key];
      thisFile.mv(`${dir}/${req.files[key].name}`, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('File uploaded!');
        }
      });
    }

    res.send(req.body);

  });

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
    if(process.env.NODE_ENV === 'production') deleteFile = `client/images/${uniqID}/${new_name}`
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
