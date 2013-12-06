
// dimensions
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height,
    color: getRndColor()
});

boxes.push({
    x: 0,
    y: height - 2,
    width: width*1000,
    height: 50,
    color: getRndColor()
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
emitters.push(new Emitter(new Vector(100,30), Vector.fromAngle(0, 0), 1, images.flake_maroon, 30, null, 1, {x:10, y: 10}, 'player')); // Player

for (var i = 0; i < 50; i++){
    emitters.push(new Emitter(new Vector(10+i*70,-10), Vector.fromAngle((2*Math.PI*90)/360, 1), 1, images.flake_white, 700, Math.PI/2, 0, {x:3, y:3} )); // Left Flame
    emitters[i].start_position.x = 10+i*70;
}
//for (var i = 0; i < 10; i++)
//    emitters.push(new Emitter(new Vector(Math.random()*canvas.width,Math.random()*(canvas.height-40)), Vector.fromAngle((2*Math.PI*90)/360, 1), 1, images.flame_point, 200, Math.PI/8, 0, {x:4, y:4} )); // Left Flame

fields.push(new Field(new Vector(200, 230), -45));

///////////////////////////////////////////////////////////////////////////////////////////////////////////