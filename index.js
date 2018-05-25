const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fileUpload = require('express-fileupload');
const keys = require('./config/keys');


require('./models/User');
require('./models/Articles');
require('./models/Menu');
require('./models/Social');
require('./models/Setting');



mongoose.connect(keys.mongoURI, { autoIndex: false });

const app = express();

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  const User = mongoose.model('users');
  User.findById(id).then(user => {
      done(null, user);
    })
})

// 627716538132-bsjqc434erkqlg1ccqjmsq24juq5jc83.apps.googleusercontent.com
// X0k5_7IdxoWw6y5DhR-BPdLk
passport.use(new GoogleStrategy({
  clientID: keys.googleClientId,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  const User = mongoose.model('users');
  User.findOne({googleId: profile.id }).then(existingUser => {
    if(existingUser) {
      // we alredy have a record with the given profile ID
      done(null, existingUser);
    }else{
      // we dont have a user record with this ID,make a new record
      new User({ googleId: profile.id }).save()
      .then(user => done(null, user));
    }
  })

}));

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/articlesRoutes')(app);
require('./routes/menuRoutes')(app);
require('./routes/socialRoutes')(app);
require('./routes/imageRoutes')(app);
require('./routes/settingRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    const path = require('path'); //We need path earlier for this!
    app.use(express.static(path.join(__dirname, '/client/build')));
    //No more changes from here on now
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
