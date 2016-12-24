module.exports = function (app, io) {
	var users = [];
    var rooms = [];

	app.get('/chat/login', function (req, res) {
		res.render('chat_login');
	});

	app.get('/chat/inbox/:user/:room', function (req, res) {
		if (rooms.indexOf(req.params.room) < 0) {
            rooms.push(req.params.room);
        }
		res.render('chat');
	});

	var chat = io.of('/chat');
    chat.on('connection', function (socket) {
		console.log('users connected: ' + users.length);
        socket.emit('load rooms', rooms);
        socket.emit('create user', socket.id, function (user) {
            socket.join(user.room);
            users.push(user);
        });
    	socket.on('send msg', function (data) {
            console.log(data);
    		chat.to(data.room).emit('inbox', data);
    	});
        socket.on('disconnect', function () {
            users.splice(users.findIndex(o => o.id == socket.id), 1);
            console.log('user disconnected');
        });
	});
}