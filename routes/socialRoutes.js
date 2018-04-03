const mongoose = require('mongoose');

const Social = mongoose.model('socials');

module.exports = (app) => {

  app.post( '/api/icons', async (req, res) => {

    const { name, classname, link } = req.body;
    const social = new Social({
      name,
      classname,
      link
    })
    // const idNew = mongoose.Types.ObjectId(id);
    //
    // if(id){
    //   Menu.findByIdAndUpdate(idNew, {name}, (err, menu) => {if(err) console.error(err)})
    // }else{
      social.save(err => {
        console.log(err)
      })
    // }

    const data = await Social.find({});
    res.send(data);

  });

  app.get('/api/icons', async (req, res) => {
    const social = await Social.find({});
    res.send(social);
  })

  app.post('/api/social/delete', async (req, res) => {
    Social.findByIdAndRemove(mongoose.Types.ObjectId(req.body.id), (err, menu) => {
      if (err) return res.status(500).send(err);
    });

    const data = await Social.find({});
    res.send(data);
  })

}
