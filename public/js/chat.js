angular.module('nodev', ['angularMoment']).controller('chatController', ['$scope', 'moment', 'socketChat', function ($scope, moment, socket) {
	$scope.inmsgs = [];
	var url = window.location.href;
	var urlspl = url.split('/');
	var user = {};

	socket.on('connect', function () {
		socket.on('create user', function (ids, fn) {
			user = {
				id: ids,
				name: urlspl[urlspl.length-2],
				room: urlspl[urlspl.length-1]
			};
			fn(user);
		});
	});
	
	$scope.sendMsg = function (msgSent) {
		var message = {
			user: user.name,
			room: user.room,
			time: Date.now(),
			msg: msgSent
		};
		$scope.msgSent = '';
		socket.emit('send msg', message);
	};

	socket.on('inbox', function (incomingMsg) {
		var inmsg = [];
		if (incomingMsg.user == user.name) {
			inmsg = {
				user: incomingMsg.user,
				time: incomingMsg.time,
				msg: incomingMsg.msg,
				side: 'right'
			};
		} else {
			inmsg = {
				user: incomingMsg.user,
				time: incomingMsg.time,
				msg: incomingMsg.msg,
				side: 'left'
			};
		}
		console.log(inmsg);
		$scope.inmsgs.push(inmsg);
	});
}]);
angular.module('nodev').controller('loginchatController', ['$scope', 'socketChat', function ($scope, socket) {
	$scope.rooms = [];
	var login;
	socket.on('connect', function () {
		socket.on('load rooms', function (serverRooms) {
			$scope.rooms = serverRooms;
		});
	});
	$scope.openChat = function () {
		function setRoom () {
			if($scope.createRoom){
				return $scope.newRoom;
			}else {
				return $scope.room;
			}
		}
		login = {
			user: $scope.username,
			room: setRoom()
		};
		window.location.href = "/chat/inbox/" + login.user + "/" + login.room;
	};
	
}]);
angular.module('nodev').factory('socketChat', function ($rootScope) {
  var socket = io.connect('/chat');
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