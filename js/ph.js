(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

colors = [
    {name:"red", color:"rgb(100,0,0)"},
    {name:"black", color:"rgb(0,0,0)"},
    {name:"grey", color:"rgb(100,100,100)"},
    {name:"green", color:"rgb(0,100,0)"}
        ];

images = {
    flake: new Image(),
    flame_point: new Image()

        };

im_col = images.length;

images.flake.src = 'img/flake_blue.png';
images.flame_point.src = 'img/flame_point.png';


im_list = [images.flake, images.flame_point];



function getRndColor (){
    return colors[Math.floor(Math.random()*colors.length)].color;
}


var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 400,
    player = {
        x: width / 2,
        y: height - 15,
        width: 16,
        height: 16,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

var boxes = []; /// world


canvas.width = width;
canvas.height = height;





/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////





document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});