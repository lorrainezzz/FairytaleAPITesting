let mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
        adminname: String,
        adminpwd: String
    },
    { collection: 'admin' });

module.exports = mongoose.model('Admin', AdminSchema);