const mongoose = require('mongoose');
const rimraf = require('rimraf');

const Project = mongoose.model('projects');
const Menu = mongoose.model('menus');

module.exports = app => {

  app.post( '/api/project/:id', async (req, res) => {

    const { title, content, menuId, image } = req.body;

    image.map(function(item) {
      item.name = encodeURIComponent(item.name)
    })

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

  app.post('/api/article/delete', (req, res) => {
    Project.findByIdAndRemove(mongoose.Types.ObjectId(req.body.id), (err, item) => {
      if (err) return res.status(500).send(err);

      let deleteFolderImage = `client/public/images/${item.uniqID}`
      if(process.env.NODE_ENV === 'production') deleteFolderImage = `client/build/images/${item.uniqID}`
      rimraf(deleteFolderImage, () => console.log('done'))
    });


    Project.find({}, (err, data) => {
      res.send(data)
    });

  })

  app.put('/api/article', (req, res) => {
    const idNew = mongoose.Types.ObjectId(req.body.id);
    const { menuId, title, content, image } = req.body.body;
    let newImageName;
    image.map(function(item) {
      newImageName = decodeURIComponent(item.name)
      item.name = encodeURIComponent(newImageName)
    })
    Project.findByIdAndUpdate(idNew, { menuId, title, content, image }, (err, menu) => {if(err) console.error(err)})
    res.send({})
  })

  app.put('/api/article/column', async (req, res) => {
    const idNew = mongoose.Types.ObjectId(req.body.id);
    const { column } = req.body;
    Project.findByIdAndUpdate(idNew, { column }, (err, menu) => {if(err) console.error(err)})
    const data = await Project.find({});
    res.send(data);
  })
}
