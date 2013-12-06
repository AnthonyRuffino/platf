function show_start_menu(){
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0, width, height);

	ctx.textAlign = "center";
	ctx.fillStyle = "#00F";
    ctx.strokeStyle = "#F00";
    ctx.font = "italic 30pt Arial";
    ctx.fillText("Нажми Enter", width/2, 200);
    ctx.font = 'bold 30px sans-serif';
    ctx.strokeText("Катюшка - молодец!", width/2, 150);

    menu_timer = setInterval(function(){
    	if (in_menu ==0){
    		clearInterval(menu_timer);
    		update();
    	}
    },200);

}

function game_over(){
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0, width, height);

	ctx.textAlign = "center";
	ctx.fillStyle = "#ff4444";
    ctx.strokeStyle = "#F00";
    ctx.font = "italic 15pt Arial";
    ctx.fillText("F5, чтобы начать заново", width/2, 200);
    ctx.font = 'bold 40px sans-serif';
    ctx.strokeText("GAME OVER", width/2, 150);

  
}