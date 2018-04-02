const mongoose = require('mongoose');

const Project = mongoose.model('projects');
const Menu = mongoose.model('menus');

module.exports = app => {

  app.post( '/api/project/:id', async (req, res) => {

    const { title, content, menuId, image } = req.body;

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
    const { menuId, title, content, image } = req.body.body;
    Project.findByIdAndUpdate(idNew, { menuId, title, content, image }, (err, menu) => {if(err) console.error(err)})
    res.send({})
  })
}
