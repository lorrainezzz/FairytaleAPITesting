let authors = require('../models/author');
let express = require('express');
let router = express.Router();
let Author = require('../models/author');

let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fairytabledatabase');
let db = mongoose.connection;
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


router.searchAuthor = (req,res) =>{
    const pattern = new RegExp('^.*'+req.body.aname+'.*$','i');
    Author.find({"aname": pattern} , function(err,cellback){
        if (err)
            res.send(err);
        res.json(authors);
    });
}

router.findAllAuthor = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Author.find(function(err, authors) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(authors,null,5));
    });
}


router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Author.find({ "aname" : req.params.aname },function(err, authors) {
        if (err)
            res.send('Author NOT Found!!');
        else
            res.send(JSON.stringify(authors,null,5));
    });
}



router.addAuthor = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var author = new Author();
    author.aname = req.body.aname;
    author.save(function(err) {
        if (err)
            res.json({ message: 'Author NOT Added!'});
        else
            res.json({ message: 'Author Added Successfully!'});
    });
}

router.deleteAuthor = (req, res) => {
    Author.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Author NOT Deleted!'});
        else
            res.json({ message: 'Author Deleted!'});
    });
}


module.exports = router;