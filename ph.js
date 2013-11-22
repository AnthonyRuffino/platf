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
		/*
		for (var y = 0; y <= map.length-1; y++){
			for (var x = 0; x <= map[0].length-1; x++){
				switch (map[y][x]){
					case 0: drawRect(x*world.cellMultiplier, y*world.cellMultiplier, world.cellSize, "rgb(255,255,255)"); break;
					case 1: drawRect(x*world.cellMultiplier, y*world.cellMultiplier, world.cellSize, "rgb(60,0,90)"); break;
					case 3: drawRect(x*world.cellMultiplier, y*world.cellMultiplier, world.cellSize, "rgb(255,255,0)"); break;
				}
			}
		}
		*/

		
	}
}

chel = {
	x: 1,
	y: world.height-2,
	speed: [0, 0],
	accel: [0, 0],
	friction:[0.005,0],
	width: 100,
	height: 100,
	frames: 4,
	moved:[false,false],
	img: chelImg,
	currentFrame: 0,
	draw: function(){
		ctx.drawImage(this.img, 0, this.height*this.currentFrame, this.width, this.height,this.x*world.cellMultiplier, this.y*world.cellMultiplier, world.cellSize, world.cellSize);
		
		this.currentFrame++;
		if (this.currentFrame >= this.frames)		
			this.currentFrame = 0;
	},
	update: function(){
		this.x += this.speed[0];
		this.y += this.speed[1];
		this.speed[0] += this.accel[0];
		this.speed[1] += this.accel[1];
		
		if (this.speed[0]>0)
			this.speed[0] -= this.friction[0];
		if (this.speed[0]<0)
			this.speed[0] += this.friction[0];
		
		if (this.accel[0]>0)
			this.accel[0] -= this.accel[0]/1.2;
		if (this.accel[0]<0)
			this.accel[0] += this.accel[0]/1.2;

		this.moved[0] = false;
	},
	move: function(dir){
		if (dir=='right'){
			if (this.moved[0]==false){
				this.accel[0]+=0.001;
				this.moved[0] = true;
			}
		}
	}

}


function doKeyDown(e){
	switch(e.keyCode){
		case 37: alert('left'); break;
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



