
var angle = 0;
var slider;
var value = 0;

var xPos= 0;
var yPos = 0;
var circles = [];
var mousePositions = [];
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;

var starLimit = 2000;
var GLIMMER_INTERVAL = 10;
var stars = [];


// base setUp
function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    frameRate(10);
}

function draw() {
    // Step 1: Clear frame
    clearFrame();

    // Step 2: Handle asset persistance
    // drawCircles();
    drawNightSky();

    // Step 3: Handle mouse movements
    drawMouseTrail();
}

function clearFrame() {
    background(45, 52, 54)
}

function buildNightSky(densityFactor) {
    for (var starIndex = 0; starIndex < starLimit; starIndex++) {

        var range = random(0, 5);

        var w = random(2, range);
        var h = random(2, range);
        var x = random(0, WINDOW_WIDTH);
        var y = random(0, WINDOW_HEIGHT);

        stars.push({
            x: x, y:y, 
            w: w, h: h,
        });
    }
}

function getStarColor() {
    return color(random(240, 255), random(240, 255), random(230, 255));
}

function getGlimmerColor() {
    return color(random(220, 232), random(60, 70), random(10, 24));

    // rgb(232, 65, 24)
}

function drawNightSky() {

    for (var index = 0; index < stars.length; index++) {
        var s = stars[index];

        var starColor = getStarColor();;

        if (s.canGlimmer && index > 1990) {
            drawArcAroundStar(s);
        }

        if (s.canGlimmer) {
            starColor = getGlimmerColor();
        } else {
            s.canGlimmer = canGlimmer();
        }

        setFillAndStroke(starColor);
        drawStar(s);
    }
}

function drawStar(star) {
    star.lastFrameShown = frameCount;
    ellipse(star.x, star.y, star.w, star.h); 
}

function drawArcAroundStar(star) {
    noFill();
    stroke(getStarColor());
    strokeWeight(random(0, 1))
    ellipse(star.x, star.y, star.w + random(0, 10), star.h + random(0, 10)); 
    strokeWeight(random)
}

function setFillAndStroke(color) {
    fill(color);
    stroke(color);
}

function canGlimmer() {
    return random(0, 1000) > 500;
}

function drawMouseTrail(){
    for (var index = 0; index < mousePositions.length; index++) {
        var pos = mousePositions[index];
        ellipse(pos.x, pos.y, random(0, 10), random(0, 10)); 
    }
}

function mouseClicked() {
    // always set the current mouse position
    xPos = mouseX;
    yPos = mouseY;

    buildNightSky();

  }

  function mouseMoved() {
    // console.log("Mouse pos: x: " + mouseX + " y: " + mouseY);
    mousePositions.push({x: mouseX, y: mouseY});

    if (mousePositions.length > 100) {
        mousePositions.splice(0, 1);
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

