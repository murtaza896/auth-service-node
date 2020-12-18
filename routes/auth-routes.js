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
    
    // req.session
    // console.log(req.headers.cookie);
    // console.log(cookies.get("jwt:sig"));
    
    
    // res.cookie("jwt", )
    // console.log(req.session);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
  //  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
    
    res.setHeader('kuch-bhi','okkkk' );
    res.cookie("abc","def");
  //   res.header('Access-Control-Allow-Credentials', true);
  // //res.header('Access-Control-Allow-Origin', req.headers.origin);
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  //   res.setHeader('Access-Control-Expose-Headers', 'kuch-bhi,Set-Cookie');
    res.json({"token": req.user}).status(200);
    
    // res.redirect('http://localhost:4200/home');
    // res.json({"message": "logged in"}).status(200);
  }
);

module.exports = router;