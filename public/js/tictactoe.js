angular.module('nodev', []).factory('Square', function () {
	var Square = function (x, y, size) {
		this.posX = x;
		this.posY = y;
		this.size = size;
		this.color = color(83, 135, 89);

		this.img = loadImage("/img/x.png");
		this.imgPosX = -100;
		this.imgPosY = -100;

		this.show = function () {
			noStroke();
			fill(this.color);
			rect(this.posX, this.posY, this.size, this.size);
			image(this.img, this.imgPosX, this.imgPosY);
		}

		this.changeColor = function (color) {
			this.color = color;
		}

		this.playTurn = function (posX, posY) {
			this.imgPosX = posX;
			this.imgPosY = posY;
		}
	}

	return Square();
});
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
angular.module('nodev', ['angular-p5']).factory('tictactoeSketch', ['p5', 'Square', function(p5, Square) {
    return function(p) {
        var posX = 200;
        var posY = 50;
        var posSize = 100;

        var squares = [[]];

        p.setup = function() {
            var socket = io.connect('/tictactoe');
            var myCanvas = createCanvas(600, 400);
            myCanvas.parent('tictactoe');
            for (var i = 0; i < 3; i++) {
                squares[i] = [];
                for (var j = 0; j < 3; j++) {
                    squares[i][j] = new Square(posX+(i*(posSize+5)), posY+(j*(posSize+5)), posSize);
                }
            }
        };

        p.draw = function() {
            background(255);
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    squares[i][j].show();
                }
            }
        };

        p.mouseMoved = function () {
            if ((mouseX >= posX && mouseX <= posX+((posSize*3)+10)) && (mouseY >= posY && mouseY <= posY+((posSize*3)+10)) ) {
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (mouseX >= squares[i][j].posX && mouseX <= squares[i][j].posX + squares[i][j].size && mouseY >= squares[i][j].posY && mouseY <= squares[i][j].posY + squares[i][j].size) {
                            squares[i][j].changeColor(color(162, 211, 168));
                        }else {
                            squares[i][j].changeColor(color(83, 135, 89));
                        }
                    }
                }
            }
        }

        p.mousePressed = function () {
            if ((mouseX >= posX && mouseX <= posX+((posSize*3)+10)) && (mouseY >= posY && mouseY <= posY+((posSize*3)+10)) ) {
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (mouseX >= squares[i][j].posX && mouseX <= squares[i][j].posX + squares[i][j].size && mouseY >= squares[i][j].posY && mouseY <= squares[i][j].posY + squares[i][j].size) {
                            squares[i][j].playTurn(squares[i][j].posX + 30, squares[i][j].posY + 30);
                            console.log('playing');
                        }
                    }
                }
            }
        }
    };
}]);
angular.module('nodev').factory('socketTictactoe', function ($rootScope) {
  var socket = io.connect('/tictactoe');
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