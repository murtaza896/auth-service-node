require('dotenv').config();
require('./config/passport-setup');
const express           = require('express'),
app                     = express(),
authRouter              = require('./routes/auth-routes'),
userRouter              = require('./routes/user-routes'),
passport                = require('passport'),
mongoose                = require('mongoose');
cookieSession           = require('cookie-session'),
bodyParser              = require('body-parser');
eurekaHelper            = require('./eureka-helper');

mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/auth', authRouter);
app.use('/user', userRouter);


//====================================ROUTES=======================================================
app.get('/', function(req, res){
    res.send('Successful login').status(200);
});

app.get('/failed', function(req, res){
    res.send("Unauthorized User").status(401);
})

app.listen(process.env.PORT, function(){
    console.log('listening on port: ' + process.env.PORT);
})

eurekaHelper.registerWithEureka('auth-service', process.env.PORT);