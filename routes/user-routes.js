const request = require('request');
const { cookie } = require('request');
const passport = require('passport');
// const myMiddleWare = require('../app');
const cors = require('cors');

const   express       = require('express'),
        router        = express.Router(),
        bcrypt        = require('bcrypt'),
        User          = require('../models/user-model'),
        cookieSession = require('cookie-session'),
        cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(cors());

function myMiddleWare(req, res, next){
    console.log("I am in middleware");
    console.log(req.cookies);
    if(req.isAuthenticated())
        next();
    else 
        res.json({}).status(400);
}

router.post('/sign-up', (req, res) => {
    
    let payload = req.body;
    payload.type = 'local';
    console.log(req.body);
    //save the payload in mongoDB
    bcrypt.hash(payload.password, 10, (err, hash) => {
        payload.password = hash;
       // console.log(payload);
        let user = new User(payload);
        user.save()
        .then(res.send(user._id).status(200))
        .catch(res.send(-1).status(400));
    });
});

router.get('/check-existence', (req, res) => {
   let username = req.query.email;
   User.findOne({'username': username}, (err, user) => {
       if(err){
           res.send("Error").status(500);
       }
       else if(!user){
           res.send({'user_id': -1}).status(200);
       }
       else res.send({'user_id': user._id, 'type': user.type}).status(200);
   });
});

router.get('/get-user', myMiddleWare, (req, res) => {
    let user_id = req.user;
    console.log(req.cookies);
    User.findById(user_id, (err, docs)=>{
        if (err)
        {
            res.json({"message":err}).status(400);
        }
        else 
        {
            res.cookie("user_id", user_id);
            res.json({'first_name': docs['first_name'], 'last_name': docs['last_name']}).status(200);
        }
    });
    
});

module.exports = router;