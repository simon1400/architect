const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

const Setting = mongoose.model('settings');

module.exports = (app) => {

  app.post('/api/setting/theme-color', async (req, res) => {
    Setting.update({}, { themeColor: req.body.color }, (err, menu) => {if(err) console.error(err)})
    res.send(await Setting.find({}));
  })

  app.get('/api/setting', async (req, res) => {
    res.send(await Setting.find({}));
  })

}
