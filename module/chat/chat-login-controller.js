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