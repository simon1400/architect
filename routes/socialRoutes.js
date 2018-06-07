const mongoose = require('mongoose');

const Social = mongoose.model('socials');

module.exports = (app) => {

  app.post( '/api/icons', async (req, res) => {

    const { image, link } = req.body;
    const social = new Social({
      image,
      link
    })
    social.save(err => {
      console.log(err)
    })

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
