const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session');

router.use(passport.initialize());
router.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['randomKey']
}));
router.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user);
    // console.log("I am authorized");
    res.redirect('/');
  }
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.post('/local', 
  passport.authenticate('local', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;