const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session');
const Keygrip = require('keygrip');
const cors = require('cors');



// router.use(cors());
router.use(cors({origin: ['localhost:4200/', 'localhost:8764/']}));

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
    
    // req.session
    // console.log(req.headers.cookie);
    // console.log(cookies.get("jwt:sig"));
    
    
    // res.cookie("jwt", )
    // console.log(req.session);
    res.cookie("abc","def");
    res.json({"token": req.user}).status(200);
    // res.redirect('http://localhost:4200/home');
    // res.json({"message": "logged in"}).status(200);
  }
);

module.exports = router;