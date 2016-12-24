var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;
var io = require('socket.io').listen(app.listen(port, function () {
	console.log('Listening on port: ' + port);
}));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://postibulo:1234@ds147797.mlab.com:47797/posts');

//config file
require('./config.js')(app);

//route files
require('./server/routes/index-route')(app);
require('./server/routes/chat-route')(app, io);
require('./server/routes/posts-route')(app, io);
// require('./server/routes/test-routes')(app, io);