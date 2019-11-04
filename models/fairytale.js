let mongoose = require('mongoose');

let FairytaleSchema = new mongoose.Schema({
        fname: String,
        fauthor: String,
        like: {type: Number, default: 0}
    },
    { collection: 'fairytale' });

module.exports = mongoose.model('Fairytale', FairytaleSchema);