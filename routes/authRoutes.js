const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
       successRedirect: '/admin', failureRedirect: '/admin'
    })
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })

  app.get('/api/create_user/:email', async (req, res) => {
    const user = await new User({ email: req.params.email }).save()
    res.send(user)
  })
}
