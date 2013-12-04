function update_world_pos(){
w_move = 0;
	if (player.x > width-200){
		w_coords.x -= player.speed;
		player.x   -= player.speed;
		w_move     =  player.speed;
	}
	if (player.x < 200){
		if (w_coords.x!=0){		
			w_coords.x += player.speed;
			player.x   += player.speed;
			w_move     = -player.speed
		}
	}

	if (w_coords.x > 0)
		w_coords.x = 0;
}