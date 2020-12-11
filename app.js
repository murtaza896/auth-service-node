const express = require('express');
const app = express();
const authRouter = require('./routes/auth-routes');
const passport = require('passport');
const cookieSession = require('cookie-session');
var bodyParser = require('body-parser');



require('dotenv').config();
require('./config/passport-setup');
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/auth', authRouter);


app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/failed', function(req, res){
    res.send('failed to login');
})

app.listen(process.env.PORT, function(){
    console.log('listening on port: ' + process.env.PORT);
})

