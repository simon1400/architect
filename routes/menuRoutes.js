const mongoose = require('mongoose');

const Menu = mongoose.model('menus');

module.exports = (app) => {

  app.post( '/api/menu', async (req, res, next) => {

    const { name, id } = req.body;
    const menu = new Menu({
      name
    })
    const idNew = mongoose.Types.ObjectId(id);

    if(id){
      Menu.findByIdAndUpdate(idNew, {name}, (err, menu) => {if(err) console.error(err)})
    }else{
      menu.save(err => {
        console.log(err)
      })
    }

    const data = await Menu.find({});
    res.send(data);

  });

  app.get('/api/menu', async (req, res) => {
    const menu = await Menu.find({});
    res.send(menu);
  })

  app.post('/api/menu/delete', async (req, res) => {
    Menu.findByIdAndRemove(mongoose.Types.ObjectId(req.body.id), (err, menu) => {
      if (err) return res.status(500).send(err);
    });

    const data = await Menu.find({});
    res.send(data);
  })

  app.put('/api/menu', async (req, res) => {
    req.body.menu.map(item => {
      Menu.findByIdAndUpdate(mongoose.Types.ObjectId(item._id), {index: item.index}, (err, menu) => {if(err) console.error(err)})
    })


    const data = await Menu.find({});
    res.send(data);
  })

}
