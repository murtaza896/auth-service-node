const passport = require('passport');
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
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        // console.log(profile);
        console.log(req.query);
        done(null, profile);
    }
));

passport.use(new LocalStrategy(
        function(username, password, done) {
            // User.findOne({ username: username }, function (err, user) {
            //   if (err) { return done(err); }
            //   if (!user) { return done(null, false); }
            //   if (!user.verifyPassword(password)) { return done(null, false); }
            //   return done(null, user);
            // });
            console.log(username, password);
            return done(null, username);
        }
    )
);

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    let url = "https://graph.facebook.com/v3.2/me?" +
    "fields=id,name,email,first_name,last_name&access_token=" + accessToken;

    request({
        url: url,
        json: true
    }, function (err, response, body) {
        let email = body.email;  // body.email contains your email
        console.log(body); 
    });
    // console.log(profile);
    return cb(null, profile);
  }
));

module.exports = passport;