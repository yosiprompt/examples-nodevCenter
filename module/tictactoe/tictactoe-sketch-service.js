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