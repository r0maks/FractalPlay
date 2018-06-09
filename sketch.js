var xPos= 0;
var yPos = 0;
var circles = [];
var mousePositions = [];
var stars = [];

// Constants
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var STAR_LIMIT = 4500;
var GLIMMER_INTERVAL = 10;

var Y_AXIS = 1;
var X_AXIS = 2;
var c1, c2;

// base set up
function setup() {

    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    frameRate(20);
}

function draw() {
    // Step 1: Clear frame
    // background(21);
    setGradient(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT, c2, c1, X_AXIS);
    // Step 2: Handle asset persistance
    // drawCircles();
    drawNightSky();

    // Step 3: Handle mouse movements
    // drawMouseTrail();
}

function showNewNightSky() {
    // set bg
    setRandomizedGradientColors();

    // clear stars
    stars = [];

    buildNightSky();
}

function setRandomizedGradientColors(){

    var colorPallete = [
        color(34,17,34),
        color(51,34,85),
        color(85,68,170),
        color(51,51,119),
    ];

    if (colorPallete) {

        c1 = colorPallete[int(random(colorPallete.length))];
        c2 = colorPallete[int(random(colorPallete.length))];

    } else {
        
        c1 = color(31);
        c2 = color(42);
    }
}

function buildNightSky() {

    for (var starIndex = 0; starIndex < STAR_LIMIT; starIndex++) {

        var range = random(0, 5);

        var w = random(2, range);
        var h = random(2, range);
        var x = random(0, WINDOW_WIDTH);
        var y = random(0, WINDOW_HEIGHT);

        stars.push({
            x: x, y:y, 
            w: w, h: h,
            hasArc: getProbability(995),
        });
    }
}

function getProbability(range) {
    return random(0, 1000) > range;
}

function getStarColor() {
    return color(random(240, 255), random(240, 255), random(230, 255));
}

function getGlimmerColor() {
    return color(random(220, 232), random(60, 70), random(10, 24));
}

function drawNightSky() {

    for (var index = 0; index < stars.length; index++) {
        var s = stars[index];

        var starColor = getStarColor();;

        if (s.canGlimmer && s.hasArc) {
            drawArcAroundStar(s);
        }

        if (s.canGlimmer && frameCount > s.lastFrameGlimmered + 50) {
            starColor = getGlimmerColor();
            s.lastFrameGlimmered = frameCount
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
    ellipse(star.x, star.y, star.w + random(5, 10), star.h + random(5, 10)); 
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

    showNewNightSky();

  }

  function mouseMoved() {
    // console.log("Mouse pos: x: " + mouseX + " y: " + mouseY);
    mousePositions.push({x: mouseX, y: mouseY});

    if (mousePositions.length > 100) {
        mousePositions.splice(0, 1);
    }
  }


  function setGradient(x, y, w, h, c1, c2, axis) {

    if (!c1 || !c2) {
        c1 = color(41);
        c2 = color(47);
    }

    noFill();
  
    if (axis == Y_AXIS) {  // Top to bottom gradient
      for (var i = y; i <= y+h; i++) {
        var inter = map(i, y, y+h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x+w, i);
      }
    }  
    else if (axis == X_AXIS) {  // Left to right gradient
      for (var i = x; i <= x+w; i++) {
        var inter = map(i, x, x+w, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y+h);
      }
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

