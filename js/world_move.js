function update_world_pos(){
	if (player.x > width-200){
		w_coords.x -= player.speed;
		player.x -= player.speed;
	}
	if (player.x < 200){
		if (w_coords.x!=0){		
			w_coords.x += player.speed;
			player.x += player.speed;
		}
	}

	if (w_coords.x > 0)
		w_coords.x = 0;

}