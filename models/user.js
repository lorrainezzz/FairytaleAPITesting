let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        uname: String,
        upassword: String
    },
    { collection: 'user' });

module.exports = mongoose.model('User', UserSchema);