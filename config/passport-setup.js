const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
var GoogleStrategy = require('passport-google-oauth20');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
const request = require('request');

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        let payload = {
            'first_name': profile.name.givenName,
            'last_name': profile.name.familyName,
            'username': profile.emails[0].value,
            'oauth_id': profile.id,
            'type': 'google'
        }
        User.findOrCreate({ oauth_id: profile.id }, payload , function (err, user) {
          return done(err, user._id);
        });
        //console.log(profile);
       // console.log(req.query);
       // done(null, profile);
    }
));

passport.use(new LocalStrategy(
        function(username, password, done) 
        {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                // if (!user.verifyPassword(password)) { return done(null, false); }
                if(user.password != undefined)
                    if(!bcrypt.compareSync(password, user.password))
                        return done(null, false);
                    else 
                        return done(null, user._id);
                else 
                    return done(null, false);
            });
        }
    )
);

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    
    let url = "https://graph.facebook.com/v3.2/me?" +
    "fields=id,email,first_name,last_name&access_token=" + accessToken;

    request({
        url: url,
        json: true
    }, function (err, response, body) {
        let payload = {
            'username': body.email,
            'first_name': body.first_name,
            'last_name': body.last_name,
            'oauth_id': body.id,
            'type': 'facebook'
        }

        User.findOrCreate({'oauth_id': profile.id }, payload, function (err, user) {
            return done(err, user._id);
        });
    });

    //console.log(profile);
    // return cb(null, profile);
  }
));

module.exports = passport;