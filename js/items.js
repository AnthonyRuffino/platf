var Coin = function(x, y, blockSize) {
	this.x = x;
	this.y = y;
	this.width = 18;
	this.height = 18;
	this.blockSize = blockSize;
	this.img = images.coin;
	this.frame = Math.floor(Math.random()*4);
}
Coin.prototype.draw = function(num){
	ctx.drawImage(this.img, 0,
							32*Math.floor(this.frame),
							32,
							32,
							(this.x)*this.blockSize+w_coords.x, 
							this.y*this.blockSize, 
							this.width, 
							this.height);
	this.frame+=0.1;
	if (this.frame > 3)
		this.frame = 0;
}
Coin.prototype.checkCol = function(i){
		///////////Правее левой границы.......Левее правой границы
		
	if ( (Math.abs((player.x+player.width/2) - (this.x*this.blockSize + this.width/2 + w_coords.x) )<this.width/1.5)   )
		if ((Math.abs((player.y+player.height/2) - (this.y*this.blockSize + this.height/2) )<12))
		{
			player.coins++;
			coins.splice(i,1);
			particle_bum(this.x*this.blockSize+w_coords.x, this.y*this.blockSize, images.sparkle, {x:5, y:5}, 3, 100, 20);
			console.log('Coin !')
		}
}

check_lava = function(l) { // Check, if player stay in lava
	if ( player.x < l.x+l.width+w_coords.x && player.x+player.width > l.x+w_coords.x  && player.y < l.y + l.height && player.y+player.height > l.y)
		{
			particle_bum(player.x+player.width/2-8, player.y+5, images.steam, {x: 18, y: 18}, 1, 30, 8);
			player.life -= lava_hurt;
			if (player.life < 0)
				player.life = 0;
		}

}