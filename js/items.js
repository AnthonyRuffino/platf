var Coin = function(x, y, blockSize) {
	this.x = x;
	this.y = y;
	this.width = 18;
	this.height = 18;
	this.blockSize = blockSize;
	this.img = images.coin;
}
Coin.prototype.draw = function(num){
	ctx.drawImage(this.img, (this.x)*this.blockSize+w_coords.x, this.y*this.blockSize, this.width, this.height);
}
Coin.prototype.checkCol = function(i){
		///////////Правее левой границы.......Левее правой границы
		
	if ( (Math.abs((player.x+player.width/2) - (this.x*this.blockSize + this.width/2 + w_coords.x) )<this.width/1.5)   )
		if ((Math.abs((player.y+player.height/2) - (this.y*this.blockSize + this.height/2) )<12))
		{
			player.coins++;
			coins.splice(i,1);
			console.log('Coin !')
		}
}