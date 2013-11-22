var canvas = document.getElementById('varea');
var ctx = canvas.getContext('2d');
var width = 700;
var height = 400;
var timeAccel = 30;
var debug = true;
//////////Images loading

chelImg = new Image();
chelImg.src = 'img/ch.png';
bg = new Image();
bg.src = 'img/bg.png';

/////////////////////


function clear(){
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0,0,width,height);
}

function drawCircle(x,y,r, color){
	color = color || "rgb(255, 204, 0)"
	ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 360, false);
		ctx.fill();
}
function drawRect(x,y,r,color){
	color = color || "rgb(255, 204, 0)"
	ctx.fillStyle = color;
	ctx.fillRect(x,y,r,r);
}

world = {
	G : 9.8,
	cellSize: 39+(1-debug),
	cellMultiplier: 40,
	height: map.length,
	width: map[0].length,
	draw : function() {
		ctx.drawImage(bg,0,0,602,403,0,0,602,403);
	}
}

chel = {
	x: 1,
	y: world.height-2,
	speed: [0, 0],
	accel: [0, 0],
	friction:[0.01,0],
	width: 100,
	height: 100,
	frames: 4,
	moved:[false,false],
	force:[0, 0],
	mass: 10,
	img: chelImg,
	currentFrame: 0,
	getPos: function(pos){
		pos = pos || [0, 0];
		return [Math.floor(this.x+pos[0]), Math.floor(this.y+pos[1])];
	},
	getCell: function(dir){
		if (dir == 'right'){
			pos = this.getPos([1, 0]);
			console.log(pos);
			console.log(map[pos[1]][pos[0]]);
		}
	},
	draw: function(){
		ctx.drawImage(this.img, 0, this.height*Math.floor(this.currentFrame), this.width, this.height,this.x*world.cellMultiplier, this.y*world.cellMultiplier, world.cellSize, world.cellSize);
		ctx.fillStyle = "#00F";
		ctx.font = "italic 12pt Arial";
		ctx.fillText("pos: " + this.getPos(), 20,20);
		this.currentFrame+=0.25;
		if (Math.floor(this.currentFrame) >= this.frames)		
			this.currentFrame = 0;
	},
	update: function(){


		
		this.x += this.speed[0];
		this.y += this.speed[1];
		
		if(this.speed[0] >= 0.001){
			this.speed[0] -= this.friction[0];
		} else if (this.speed[0] <= -0.001){
			this.speed[0] += this.friction[0];
		} else {
			this.speed[0] = 0;
		}

	},
	move: function(dir){
		if (dir=='right'){
			this.speed[0] += 0.1;
			if (this.speed[0] > 0.2)
				this.speed[0] = 0.2;
		}
		if (dir=='left'){
			this.speed[0] -= 0.06;
			if (this.speed[0] < -0.2)
				this.speed[0] = -0.2;
		}
	}

}


function doKeyDown(e){
	switch(e.keyCode){
		case 37: characters[0].move('left'); break;
		case 38: alert('Up'); break;
		case 39: characters[0].move('right'); break;
		case 40: alert('Down'); break;
	}
};
function doMouseMove(e){
var rect = canvas.getBoundingClientRect();

}
function doMouseClick(e){
	var rect = canvas.getBoundingClientRect();
	x = Math.ceil((e.pageX - rect.left)/world.cellSize);
	y = Math.ceil((e.pageY-rect.top)/world.cellSize);
	if (x<=map[0].length && y <= map.length && x>=0 && y>=0){
		drawRect(x*world.cellMultiplier, y*world.cellMultiplier, world.cellSize, "rgb(20,20,20)");

		console.log(x + ' : '+ y);
	}

}


var characters = [];
characters.push(chel);


window.addEventListener("keydown", doKeyDown, false);
window.addEventListener("mousemove", doMouseMove, false);
window.addEventListener("mousedown", doMouseClick, false);


function loop(){
	clear();
	world.draw();
	for(var i = 0; i<=characters.length-1; i++){
		characters[i].draw();
		characters[i].update();
	}
}

setInterval(loop, 1000/timeAccel);



