const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: String, 
     password: String,
     FirstName: String, 
     LastName: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;