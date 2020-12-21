const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session');
const Keygrip = require('keygrip');
const cors = require('cors');


// router.use(cors());
router.use(cors({credentials: true, origin: 'http://localhost:4200, http://localhost:8764'}));

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user);
    // console.log("I am authorized");
    console.log(req.query);
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
  //firgure out a way of managing failureRedirect via zuul
  passport.authenticate('local', { failureRedirect: '/auth-service/failed' }),
  function(req, res) {
    res.send("Succesfull Login").status(200);
  }
);

module.exports = router;