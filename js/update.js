function update() {
    update_world_pos();
    player.running = false;
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
        player.running = true;
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37]) {
        player.running = true;
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velX *= friction;
    player.velY += gravity;
    
    /////////////Background/////////////////
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(images.bg, 0, 0, width, height);
    /////////////////////////////////////////
    ctx.beginPath();
    
    player.grounded = false;
    for (var i = 0; i < boxes.length; i++) {
        ctx.fillStyle = boxes[i].color;
        ctx.fillRect(boxes[i].x +w_coords.x, boxes[i].y, boxes[i].width, boxes[i].height);
        
        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY = 0;
        }
////////////////////////////////////////////////////

            

    }
    
    if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;
    player.y += player.velY;
    emitters[0].position.x = player.x;
    emitters[0].position.y = player.y;

    fields[0].position.x = player.x + player.width/2;
    fields[0].position.y = player.y;

    updatePr();
    drawParticles();
    fields.forEach(drawCircle);
  //  emitters.forEach(drawCircle);

    ctx.fill();
   
/*  // Draw player
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
*/
    player.draw();
    
    for (var i = 1; i < emitters.length; i++){
        emitters[i].position.x = emitters[i].start_position.x+w_coords.x;
    }

    requestAnimationFrame(update);
}