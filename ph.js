(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200,
    player = {
        x: width / 2,
        y: height - 15,
        width: 5,
        height: 5,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

var boxes = [];

// dimensions
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});
boxes.push({
	x:0,
	y:0,
	width: width,
	height: 10
})
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});
boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});

boxes.push({
    x: 120,
    y: 30,
    width: 80,
    height: 80
});
boxes.push({
    x: 170,
    y: 50,
    width: 80,
    height: 80
});
boxes.push({
    x: 220,
    y: 100,
    width: 80,
    height: 80
});
boxes.push({
    x: 270,
    y: 150,
    width: 40,
    height: 40
});
boxes.push({
    x: 370,
    y: 150,
    width: 40,
    height: 40
});

canvas.width = width;
canvas.height = height;


/////////////////////////////////////////////////
//////////////        VECTOR           //////////
/////////////////////////////////////////////////

function Vector(x, y){
	this.x = x || 0;
	this.y = y || 0;
}
// Сложить векторы
Vector.prototype.add = function(vector){
	this.x += vector.x;
	this.y += vector.y;
}
// Длина вектора
Vector.prototype.getMagnitude = function(){
	return Math.sqrt(this.x*this.x + this.y*this.y);
}
// Угол вектора, с учетом квадранта
Vector.prototype.getAngle = function(){
	return Math.atan2(this.y, this.x);
}
// Получить новый вектор, исходя из угла и размера
Vector.fromAngle = function(angle, magnitude){
	return new Vector(magnitude*Math.cos(angle), magnitude*Math.sin(angle));
}

/////////////////////////////////////////////////
////////////////   PARTICLE  ////////////////////
/////////////////////////////////////////////////
function Particle(point, velocity, acceleration, life){
	this.position = point || new Vector(0, 0);
	this.velocity = velocity || new Vector(0, 0);
	this.acceleration = acceleration || new Vector(0, 0);
	this.life = life || 100;
}
Particle.prototype.move = function(){
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.life--;
}

/////////////////////////////////////////////////
/////////////////   EMITTER   ///////////////////
/////////////////////////////////////////////////

function Emitter(point, velocity, spread){
	this.position = point;
	this.velocity = velocity;
	this.spread = spread || Math.PI / 32;
	this.drawColor = "#999";
}
Emitter.prototype.emitParticle = function(){
	var angle = this.velocity.getAngle() + this.spread - (Math.random()*this.spread*2);

	var magnitude = this.velocity.getMagnitude();

	var position = new Vector(this.position.x, this.position.y);

	var velocity = Vector.fromAngle(angle, magnitude);

	return new Particle(position, velocity, undefined, maxLife + 20 - (Math.random()*20*2));
}

/////////////////////////////////////////////////
////////////////    CONTAINERS   ////////////////
/////////////////////////////////////////////////
var particles = [];
var emitters = [new Emitter(new Vector(100,30), Vector.fromAngle(0, 0))]; /////////////Player Emitter
var maxParticles = 200;
var emissionRate = 1;
var particleSize = 3;
var maxLife = 20;
function addNewParticles() {
  // if we're at our max, stop emitting.
  if (particles.length > maxParticles) return;

  // for each emitter
  for (var i = 0; i < emitters.length; i++) {

    // emit [emissionRate] particles and store them in our particles array
    for (var j = 0; j < emissionRate; j++) {
      particles.push(emitters[i].emitParticle());
    }

  }
}

function plotParticles(boundsX, boundsY) {
  // a new array to hold particles within our bounds
  var currentParticles = [];

  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var pos = particle.position;

    // If we're out of bounds, drop this particle and move on to the next
    if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY || particle.life <= 0){
    	continue;
    } 

    // Move our particles
    particle.move();


    // Add this particle to the list of current particles
    currentParticles.push(particle);
  }

  // Update our global particles reference
  particles = currentParticles;
}

function drawParticles() {
  ctx.fillStyle = 'rgb(255,150,0)';
  ctx.strokeStyle = 'rgb(255,100,100)';
  ctx.beginPath();
  ctx.moveTo(particles[0].position.x||player.position.x, particles[0].position.y||player.position.y);
 
 /// FLAMES
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    ctx.fillRect(position.x, position.y+player.height/2, particleSize, particleSize);
    //ctx.lineTo(position.x, position.y+player.height/2);
  }

/*  /// Curve 
  for (var i = 0; i < particles.length-3 ; i+=3) {
  	ctx.bezierCurveTo(particles[i+1].position.x,particles[i+1].position.y,    
  						particles[i+2].position.x,particles[i+2].position.y,   
  						particles[i+3].position.x,particles[i+3].position.y);
  }
  ctx.stroke();
  */
}
function updatePr(){
	addNewParticles();
	plotParticles(canvas.width, canvas.height);
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
function update() {

    // check keys
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.beginPath();
    
    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }

    }
    
    if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;
    player.y += player.velY;
    emitters[0].position.x = player.x;
    emitters[0].position.y = player.y;

    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    updatePr();
    drawParticles();
    requestAnimationFrame(update);
}

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});