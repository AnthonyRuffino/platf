var hud = function(){
	this.color = "#aaffaa";
	this.coin_img = images.coin;
	this.frame = 0;
}
hud.prototype.draw = function(){
	ctx.drawImage(this.coin_img, 
					0,
					32*Math.floor(this.frame),
					32,
					32,
					width-50, 5, 16, 16);
	ctx.fillStyle = "#ffff00";
	ctx.font = "16pt Arial";
    ctx.fillText(player.coins, width-20, 20);
    this.frame+=0.1;
    if (this.frame>3)
    	this.frame = 0;

}
