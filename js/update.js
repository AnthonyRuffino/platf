var HUD = new hud();

//w_coords.x = -800;
//player.x = 1200;
var _end  = false;
function update() {
    update_world_pos();
    player.running = false;
    // check keys
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space or 'W'
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39] || keys[39] || keys[68]) {
        // right arrow or 'D'
        player.running = true;
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[65]) {
        player.running = true;
        // left arrow or 'A'
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
    


    ctx.fill();
   

    
    
    for (var i = 1; i < emitters.length; i++){
        emitters[i].position.x = emitters[i].start_position.x+w_coords.x;
    }
    for (var i = 0; i < coins.length; i++){
        coins[i].draw();
        coins[i].checkCol(i);
        
    }
    for (var i = 0; i < hearts.length; i++) {
        console.log(hearts.length);
        hearts[i].draw();
        hearts[i].checkCol(i);
    }
    
// LAVA
    for (var i = 0; i < lava.length; i++) {
        ctx.drawImage(images.lava, lava[i].x+w_coords.x, lava[i].y, lava[i].width, lava[i].height);
        check_lava(lava[i]);
    }

    drawParticles();
    player.draw();
    if (player.life <= 0) {
            game_over();
            return 0;
        }

    HUD.draw();
    if (_end){
        show_end();
        return;
    }
    requestAnimationFrame(update);
}
