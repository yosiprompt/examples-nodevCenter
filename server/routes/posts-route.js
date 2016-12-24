var Comment = require('./../model/comments.js');
var saveComments = [];
module.exports = function (app, io) {
	
	// console.log(saveComments);
	app.get('/posts', function (req, res) {
		res.render('posts');
		
	});

	var posts = io.of('/posts');
	posts.on('connection', function (socket) {
		Comment.find({}, function (err, comments) {
			if (err) {
				console.log(err);
			} else {
				for(var cmnt in comments) {
					saveComments.push({name: comments[cmnt].name, comment: comments[cmnt].comment, date_added: comments[cmnt].date_added});
				}
			socket.emit('loadPosts', saveComments);
			}
		});
		socket.on('sendPost', function (data) {
			console.log('reciving post');
			Comment(data).save(function (err, post) {
				if (err) {
					console.log(err);
				}else {
					posts.emit('lastPost', {name: post.name, comment: post.comment, date_added: post.date_added});
				}
			});
		});
	});
}