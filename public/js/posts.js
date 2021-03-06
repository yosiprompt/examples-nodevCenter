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
angular.module('nodev').factory('socketPosts', function ($rootScope) {
  var socket = io.connect('/posts');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});