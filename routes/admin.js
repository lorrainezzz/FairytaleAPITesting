let express = require('express');
let router = express.Router();
let Admin = require('../models/admin');

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fairytabledatabase');
let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAllAdmin = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Admin.find(function(err, admins) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(admins,null,5));
    });
}

router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Admin.find({ "adminname" : req.params.adminname },function(err, admin) {
        if (admin === undefined) {
            res.json({message: 'Admin NOT FOUND'});
            //res.send(JSON.stringify(admin,null,5));
            return;
        }
        //res.json({message: 'Admin NOT FOUND'});
        res.send(JSON.stringify(admin,null,5));
    });
}

router.register = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var adminname = req.body.adminname;
    var adminpwd = req.body.adminpwd;

    if(!adminname){
        res.json({ message: 'Name cannot be empty'} );
    }
    else if(!adminpwd){
        res.json({ message: 'Password cannot be empty'} );
    }
    else{
        Admin.findOne({adminname:adminname},function (err, info) {
            if(info){
                res.json({ message: 'Name is existed',errmsg : err} );
                return;
            }
            var admin = new Admin({
                adminname: adminname,
                adminpwd: adminpwd
            });
            admin.save(function(err) {
                if (err)
                    res.json({ message: 'Registered Failed. Please try again.', errmsg : err } );
                else
                    res.json({ message: 'Registered Successfully!!', data: admin });
            });
        });
    }
}

router.login = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var adminname = req.body.adminname;
    var adminpwd = req.body.adminpwd;

    if(!adminname){
        res.json({ message: 'Name cannot be empty'} );
    }
    else if(!adminpwd){
        res.json({ message: 'Password cannot be empty'} );
    }
    else{
        Admin.findOne({adminname:adminname},function (err, admin) {
            if (admin) {
                if (admin.adminpwd === adminpwd) {
                    res.json({message: 'Login successfully'});
                } else {
                    res.json({message: 'Password is wrong!!'})
                }
            }
        })
    }
}

module.exports = router;