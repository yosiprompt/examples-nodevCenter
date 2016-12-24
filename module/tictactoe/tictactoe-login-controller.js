angular.module('nodev', []).controller('tictactoeLoginController', ['$scope', 'socketTictactoe', function ($scope, socket) {
	$scope.rooms = [];
	var login;
	socket.on('connect', function () {
		socket.on('loadRooms', function (serverRooms) {
			$scope.rooms = serverRooms;
			console.log('SR: ' + serverRooms);
			console.log('LR: ' + $scope.rooms);
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
		window.location.href = "/games/tictactoe/" + login.user + "/" + login.room;
	};
	
}]);