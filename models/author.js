let mongoose = require('mongoose');

let AuthorSchema = new mongoose.Schema({
		aname: String

	},
	{ collection: 'author' });

module.exports = mongoose.model('Author', AuthorSchema);