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
    flake_white: new Image(),
    flake_blue : new Image(),
    flake_maroon : new Image(),
    flame_point: new Image()

        };

im_col = images.length;

images.flake_blue.src = 'img/flake_blue.png';
images.flake_white.src = 'img/flake_white.png';
images.flame_point.src = 'img/flame_point.png';
images.flake_maroon.src = 'img/flake_maroon.png';

im_list = [images.flake_white, images.flame_point];






function getRndColor (){
    return colors[Math.floor(Math.random()*colors.length)].color;
}


var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 400,
    player = {
        x           : width / 2,
        y           : height - 15,
        width       : 16,
        height      : 30,
        speed       : 3,
        velX        : 0,
        velY        : 0,
        jumping     : false,
        grounded    : false,
        running     : false,
        frame       : 0,
        image_urls  : ["img/player/run_right.png",
                       "img/player/run_left.png",
                       "img/player/jump_up_right.png",
                       "img/player/jump_down_right.png",
                       "img/player/jump_up_left.png",
                       "img/player/jump_down_left.png",
                       "img/player/stay.png"],
        images      : [],
        draw        : function(){ draw_player(this) }
    },
    keys = [],
    friction = 0.8,
    gravity = 0.3;

for (var i = 0; i<player.image_urls.length; i++){
    player.images.push(new Image());
    player.images[i].src = player.image_urls[i];
}

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