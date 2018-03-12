const mongoose = require('mongoose');

const Project = mongoose.model('projects');

module.exports = (app) => {
  app.post('/api/project', (req, res) => {
    const { content } = req.body;

    const project = new Project({
      content,
      // _user: req.user.id,
      dateSent: Date.now()
    })

    project.save()
    res.send(req.body)

  });
}
