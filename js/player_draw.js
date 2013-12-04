function draw_player(player){
	//ctx.fillStyle = "#ffff00";
   // ctx.fillRect(player.x, player.y, player.width, player.height);
	if(player.running){
		if (keys[39]){ // Right pressed
			if (!player.jumping){ // Just Run
				ctx.drawImage(player.images[0], 0,
												32*Math.floor(player.frame), 
												32,
												32,
												player.x-player.width,
												player.y,
												player.width*2,
												player.height);
			}else { // Jump_Right
				if(player.velY > 0) // down
					ctx.drawImage(player.images[3], 0,
												0, 
												32,
												32,
												player.x-player.width,
												player.y,
												player.width*2,
												player.height);
				else // up
					ctx.drawImage(player.images[2], 0,
												0, 
												32,
												32,
												player.x-player.width,
												player.y,
												player.width*2,
												player.height);
			}
		} else 
		if (keys[37]){ // LEFT pressed
			if(!player.jumping){ // Just Run
				ctx.drawImage(player.images[1], 0,
												32*Math.floor(player.frame), 
												32,
												32,
												player.x,
												player.y,
												player.width*2,
												player.height);
			} else {
				if(player.velY > 0) // down
					ctx.drawImage(player.images[5], 0,
												0, 
												32,
												32,
												player.x,
												player.y,
												player.width*2,
												player.height);
				else // up
					ctx.drawImage(player.images[4], 0,
												0, 
												32,
												32,
												player.x,
												player.y,
												player.width*2,
												player.height);
			}
		}
		

	    
	} else { // Stay
		if (player.velY < 1)
			ctx.drawImage(player.images[6], player.x-player.width/2, player.y, player.width*2, player.height);
		else
			ctx.drawImage(player.images[7], player.x-player.width/2, player.y, player.width*2, player.height);
	}
	player.frame+=0.3;
	    if (player.frame >= 4)
	    	player.frame = 0;
}