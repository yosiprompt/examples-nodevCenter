angular.module('nodev', []).controller('postsController', ['$scope', 'socketPosts', function ($scope, socket) {
	$scope.sendPost = function (sender, post) {
		$scope.msg = '';
		socket.emit('sendPost', {name: sender, comment: post});
	}

	socket.on('connect', function () {
		socket.on('loadPosts', function (data) {
			$scope.posts = data;
		});
		socket.on('lastPost', function (data) {
			$scope.posts.push(data);
		});
	});
}]);