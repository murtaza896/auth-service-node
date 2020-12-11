const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     oauth_id: String,
     username: String, 
     password: String,
     first_name: String, 
     last_name: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;