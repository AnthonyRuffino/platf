
var particles = [];
var emitters = []; /////////////Player Emitter
var maxParticles = 2000;
//var emissionRate = 4;
var particleSize = 3;
var maxLife = 20;
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
function Particle(point, velocity, acceleration, life, img){
	this.position = point || new Vector(0, 0);
	this.velocity = velocity || new Vector(0, 0);
	this.acceleration = acceleration || new Vector(0, 0);
	this.life = life || 100;
    this.maxLife = life || 100;
    this.img = img;
}
Particle.prototype.move = function(){
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.life--;
    if (this.life<0)
        this.life = 0;
}

/////////////////////////////////////////////////
/////////////////   EMITTER   ///////////////////
/////////////////////////////////////////////////

function Emitter(point, velocity, emissionRate, img, life, spread){
	this.position = point;
	this.velocity = velocity;
    this.emissionRate = emissionRate||1;
	this.spread = spread || Math.PI / 32;
	this.drawColor = "#999";
    this.img = img || images.flake;
    this.maxLife = life || maxLife;
}
Emitter.prototype.emitParticle = function(){
	var angle = this.velocity.getAngle() + this.spread - (Math.random()*this.spread*2);

	var magnitude = this.velocity.getMagnitude();

	var position = new Vector(this.position.x, this.position.y);

	var velocity = Vector.fromAngle(angle, magnitude);

	return new Particle(position, velocity, undefined, this.maxLife + 20 - (Math.random()*20*2), this.img);
}

/////////////////////////////////////////////////
////////////////    CONTAINERS   ////////////////
/////////////////////////////////////////////////

function addNewParticles() {
  // if we're at our max, stop emitting.
  if (particles.length >= maxParticles) return;

  // for each emitter
  for (var i = 0; i < emitters.length; i++) {

    // emit [emissionRate] particles and store them in our particles array
    for (var j = 0; j < emitters[i].emissionRate; j++) {
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

 
 /*
 /// FLAMES
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    ctx.fillRect(position.x, position.y+player.height/2, particleSize, particleSize);
    //ctx.lineTo(position.x, position.y+player.height/2);
  }
  */
  /// Flakes
  ctx.save();
  for (var i = 0; i < particles.length; i++) {
    var position = particles[i].position;
    
    ctx.globalAlpha = (Math.sqrt(particles[i].life))/particles[i].maxLife;
    ctx.drawImage(particles[i].img, position.x ,position.y);
    
    //ctx.lineTo(position.x, position.y+player.height/2);
  }
  ctx.restore();

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