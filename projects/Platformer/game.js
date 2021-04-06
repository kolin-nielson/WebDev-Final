// The attributes of the player.
var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 20,
    width: 20
};
function Radomplat(min, max) {
    return Math.random() * (max - min) + min;
  }
// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
};
// The friction and gravity to show realistic movements    
var gravity = 0.6;
var friction = 0.4;
// The number of platforms
var num = Radomplat(5,50);
// The platforms
var platforms = [];
// Function to render the canvas
function rendercanvas() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, 1000, 1000);
}
// Function to render the player
function renderplayer() {
    ctx.fillStyle = "#21e311";
    ctx.fillRect((player.x) - 20, (player.y) - 20, player.width, player.height);
}
  
// Function to create platforms
function createplat() {
    for (i = 0; i < num; i++) {
        platforms.push(
            {
                x:  Radomplat(4,100) * i,
                y: 200 + (Radomplat(10,40) * i),
                width: Radomplat(20,200),
                height: 15
            }
        );
    }
}


let platColor = "#f20c0c";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

// Function to render platforms
function renderplat() {
    ctx.fillStyle = platColor;
    for (let i = 0; i < num; i++) {

        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }


}
// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if (e.keyCode == 37) {
        keys.left = true;
    }
    // 38 is the code for the up arrow key
    if (e.keyCode == 38) {
        platColor = getRandomColor();

        if (player.jump == false) {
            player.y_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if (e.keyCode == 39) {
        keys.right = true;
    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if (e.keyCode == 37) {
        keys.left = false;
    }
    if (e.keyCode == 38) {
        if (player.y_v < -2) {
            player.y_v = -3;
        }
    }
    if (e.keyCode == 39) {
        keys.right = false;
    }
}
function loop() {
    // If the player is not jumping apply the effect of frictiom
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
        player.x_v = -7;
    }
    if (keys.right) {
        player.x_v = 7;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collions with the platform
    let i = -1;
    for (let k = 0; k < num; k++) {
        if (platforms[k].x <= player.x && player.x <= platforms[k].x + platforms[k].width &&
            platforms[k].y <= player.y && player.y <= platforms[k].y + platforms[k].height ) {
            i = k;
        }
    }

    if (i > -1) {
        player.jump = false;
        player.y = platforms[i].y;
    }
    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat();
}
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 1000;
ctx.canvas.width = 1000;
createplat();
// Adding the event listeners
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

setInterval(loop, 22);