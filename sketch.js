
var angle = 0;
var slider;
var value = 0;

var xPos= 0;
var yPos = 0;
var circles = [];
var mousePositions = [];
var go = false;

function setup() {
    createCanvas(1000, 750);
    background(41);
}

function draw() {
    background(41);
    for (var index = 0; index < circles.length; index++) {
        var e = circles[index];
        fill(e.color);
        stroke(e.color);
        ellipse(e.x, e.y, e.w, e.h); 
    }

    for (var index = 0; index < mousePositions.length; index++) {
        var pos = mousePositions[index];
        ellipse(pos.x, pos.y, 10, 10); 
    }
}

function mouseClicked() {
    // always set the current mouse position
    xPos = mouseX;
    yPos = mouseY;

    addCircleToStack(xPos, yPos);

  }

  function mouseMoved() {
    go=true;
    mousePositions.push({x: mouseX, y: mouseY});

    if (mousePositions.length > 100) {
        mousePositions.splice(0, 1);
    }
  }


  function addCircleToStack(x, y) {

    var w = random(80, 80);
    var h = random(80, 80);

    if(!hasCollision(x, y, w, h)) {
        circles.push({x: x, y:y, w: w, h: h, color: color(random(100, 255), random(0, 80), random(0, 80))});
    }
  }


  function hasCollision(x, y, w, h) {

    for (var colIndex = 0; colIndex < circles.length; colIndex++) {
        var thisCircle = circles[colIndex];

        if (thisCircle.x < x + w &&
            thisCircle.x + thisCircle.w > x &&
            thisCircle.y < y + h &&
            thisCircle.h + thisCircle.y > y) {

                console.log('Collision detected');


            return true;
         }
    }

    return false;
  }

