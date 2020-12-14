const   express       = require('express'),
        router        = express.Router(),
        bcrypt        = require('bcrypt'),
        User          = require('../models/user-model');

router.post('/sign-up', (req, res) => {
    let payload = req.body;
    payload.type = 'local';
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

module.exports = router;