const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     oauth_id: String,
     username: String, 
     password: String,
     first_name: String, 
     last_name: String,
     type: String
});

userSchema.plugin(findOrCreate);
const User = mongoose.model('user', userSchema);

module.exports = User;