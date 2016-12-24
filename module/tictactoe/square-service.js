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