const mongoose = require('mongoose');

const Menu = mongoose.model('menus');

module.exports = (app) => {

  app.post('/api/menu', async (req, res) => {
    const count = await Menu.find({});

    const { name } = req.body;
    const menu = new Menu({
      id: count.length,
      name
    })

    menu.save(err => {
      console.log(err)
    })
    res.send(req.body)
  });

  // app.get('/api/projects', async (req, res) => {
  //   const projects = await Project.find({});
  //   res.send(projects);
  // })

}
