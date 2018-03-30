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
const Menu = mongoose.model('menus');

module.exports = (app) => {

  app.post( '/api/project/:id', upload.array('file', 12), async (req, res) => {

    const { title, content, menuId } = req.body;
    image = JSON.parse(req.body.image);

    const parentPage = await Menu.findById(mongoose.Types.ObjectId(menuId));

    const project = new Project({
      uniqID: req.params.id,
      title,
      content,
      image,
      menuId,
      parentPage: parentPage.name.toLowerCase(),
      dateSent: Date.now()
    })

    project.save(err => {
      console.log(err)
    })
    res.send(req.body)
  });

  app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({});
    res.send(projects);
  })

  app.post('/api/article/delete', async (req, res) => {
    Project.findByIdAndRemove(mongoose.Types.ObjectId(req.body.id), (err, menu) => {
      if (err) return res.status(500).send(err);
    });

    const data = await Project.find({});
    res.send(data);
  })

  app.put('/api/article', (req, res) => {
    const idNew = mongoose.Types.ObjectId(req.body.id);
    const { menuId, title, content } = req.body.body;
    Project.findByIdAndUpdate(idNew, { menuId, title, content }, (err, menu) => {if(err) console.error(err)})
    res.send({})
  })
}
