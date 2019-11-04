let express = require('express');
let router = express.Router();
let User = require('../models/user');

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fairytabledatabase');
let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


router.findAllUser = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(users,null,5));
    });
}

router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    User.find({ "uname" : req.params.uname },function(err, user) {
        if (err)
            res.send('User NOT Found!!');
        else
            res.send(JSON.stringify(user,null,5));
    });
}

router.register = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var uname = req.body.uname;
    var upassword = req.body.upassword;

    if(!uname){
        res.json({ message: 'Username cannot be empty'} );
    }
    else if(!upassword){
        res.json({ message: 'Password cannot be empty'} );
    }
    else{
        User.findOne({uname:uname},function (err, info) {
            if(info){
                res.json({ message: 'Username is existed',errmsg : err} );
                return;
            }
            var user = new User({
                uname: uname,
                upassword: upassword
            });
            user.save(function(err) {
                if (err)
                    res.json({ message: 'Registered Failed. Please try again.', errmsg : err } );
                else
                    res.json({ message: 'Registered Successfully!!', data: user });
            });
        });
    }
}

router.login = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var uname = req.body.uname;
    var upassword = req.body.upassword;

    if(!uname){
        res.json({ message: 'Username cannot be empty'} );
    }
    else if(!upassword){
        res.json({ message: 'Password cannot be empty'} );
    }
    else{
        User.findOne({uname:uname},function (err, user) {
            if (user) {
                if (user.upassword === upassword) {
                    res.json({message: 'Login successfully'});
                } else {
                    res.json({message: 'Password is wrong!!'})
                }
            }
        })
    }
}

module.exports = router;