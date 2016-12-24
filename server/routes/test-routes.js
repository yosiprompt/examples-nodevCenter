module.exports = function (app, io) {
	app.get('/test1', function (req, res) {
		res.render('test/test1.html');
	});

	app.get('/test2', function (req, res) {
		res.render('test/test2.html');
	});

	var test1 = io.of('/test1');

	test1.on('connection', function (socket) {
		console.log('from test1 good!');
	});

	var test2 = io.of('/test2');
	test2.on('connection', function (socket) {
		console.log('form test2 good!');
	});


}