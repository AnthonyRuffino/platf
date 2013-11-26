
// dimensions
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height,
    color: getRndColor()
});
boxes.push({
	x:0,
	y:0,
	width: width,
	height: 10,
    color: getRndColor()
})
boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50,
    color: getRndColor()
});
boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height,
    color: getRndColor()
});

boxes.push({
    x: 120,
    y: 60,
    width: 80,
    height: 80,
    color: getRndColor()
});
boxes.push({
    x: 170,
    y: 50,
    width: 80,
    height: 80,
    color: getRndColor()
});
boxes.push({
    x: 220,
    y: 100,
    width: 80,
    height: 80,
    color: getRndColor()
});
boxes.push({
    x: 270,
    y: 150,
    width: 40,
    height: 40,
    color: getRndColor()
});
boxes.push({
    x: 370,
    y: 150,
    width: 40,
    height: 40,
    color: getRndColor()
});


boxes.push({
    x: 30,
    y: 360,
    width: 40,
    height: 40,
    color: getRndColor()
});
boxes.push({
    x: 130,
    y: 320,
    width: 50,
    height: 20,
    color: getRndColor()
});
boxes.push({
    x: 220,
    y: 350,
    width: 50,
    height: 20,
    color: getRndColor()
});

boxes.push({
    x: 230,
    y: 270,
    width: 50,
    height: 20,
    color: getRndColor()
});
boxes.push({
    x: 330,
    y: 230,
    width: 50,
    height: 20,
    color: getRndColor()
});

boxes.push({
    x: 350,
    y: 180,
    width: 20,
    height: 20,
    color: getRndColor()
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
emitters.push(new Emitter(new Vector(100,30), Vector.fromAngle(0, 0), 2, images.flake, 30, null, 1)); // Player

for (var i = 0; i < 5; i++)
    emitters.push(new Emitter(new Vector(125+i*9,135), Vector.fromAngle((2*Math.PI*90)/360, 1), 1, images.flame_point, 200, Math.PI/8 )); // Left Flame


fields.push(new Field(new Vector(200, 230), -20));

///////////////////////////////////////////////////////////////////////////////////////////////////////////