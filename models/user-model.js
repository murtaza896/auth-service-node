const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: String, 
     password: String,
     first_name: String, 
     last_name: String,
     oauth_id: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;