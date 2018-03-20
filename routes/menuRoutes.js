const mongoose = require('mongoose');

const Menu = mongoose.model('menus');

module.exports = (app) => {

  app.post( '/api/menu', (req, res) => {

    // const { title, content } = req.body;
    // image = JSON.parse(req.body.image);
    // const project = new Project({
    //   uniqID: req.params.id,
    //   title,
    //   content,
    //   image,
    //   dateSent: Date.now()
    // })
    //
    // project.save(err => {
    //   console.log(err)
    // })
    res.send(req.body)
  });

  // app.get('/api/projects', async (req, res) => {
  //   const projects = await Project.find({});
  //   res.send(projects);
  // })

}
