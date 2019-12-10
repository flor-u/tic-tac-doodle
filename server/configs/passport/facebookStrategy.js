require('dotenv').config();
const passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');
const bcrypt = require('bcrypt');


/////////////
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "localhost:3000/"
  },
  function (accessToken, refreshToken, profile, done) {

    User.findOne({
        facebookID: profile.id
      })
      .then(user => {
        if (user) {
          done(null, user);
          return;
        }

        User.create({
          facebookID: profile.id
          })
          .then(newUser => {
            done(null, newUser);
          })
          .catch(err => done(err)); // closes User.create()
      })
      .catch(err => done(err)); // closes User.findOne()
  }
));