const mongoose = require('mongoose');
const Multer = require('multer');
const imgUpload = require('../middlewares/imgUpload');
const imgDelete = require('../middlewares/imgDelete');

const Project = mongoose.model('projects');
const Setting = mongoose.model('settings');

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

module.exports = app => {
  app.post( '/api/image/:id', multer.array('file', 12), imgUpload.uploadToGcs, async (req, res) => {
    if(req.params.id === 'favicon_image'){
      Setting.update({}, { favicon: req.params.id + '/' + req.files[0].originalname }, (err, menu) => {if(err) console.error(err)})
      let data = await Setting.find({})
      res.end();
    }
    res.send({});
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

    imgDelete(uniqID, new_name);

    if(req.params.id == 'new'){
      Project.find({}, (err, data) => {
        res.send(data)
      });
    }
  });
}
