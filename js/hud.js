var hud = function(){
	this.color = "#aaffaa";
	this.coin_img = images.coin;

}
hud.prototype.draw = function(){
	ctx.drawImage(this.coin_img, width-50, 5, 16, 16);
	ctx.fillStyle = "#ffff00";
	ctx.font = "16pt Arial";
    ctx.fillText(player.coins, width-20, 20);

}