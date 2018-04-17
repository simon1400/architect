const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const Project = mongoose.model('projects');

module.exports = app => {
  app.post( '/api/image/:id', async (req, res) => {

    let imageFile = req.files.file;

    let dir = `${process.cwd()}/client/public/images/${req.params.id}`
    if(process.env.NODE_ENV === 'production') dir = `${process.cwd()}/client/build/images/${req.params.id}`

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    if(imageFile.length) {
      imageFile.map(file => {
        file.mv(`${dir}/${imageFile.name}`, function(err) {
          if (err) {
            return console.log(err);
            //  res.status(500).send(err);
          }

          console.log('multi images upload');

          res.send(req.body);
        });
      })
    }else{
      imageFile.mv(`${dir}/${imageFile.name}`, function(err) {
        if (err) {
          return console.log(err);
          //  res.status(500).send(err);
        }

        console.log('single image upload');

        res.send(req.body);
      });
    }

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
