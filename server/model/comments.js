var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	date_added: {
		type: Date,
		default: Date.now
	}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;