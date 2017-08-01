
var angle = 0;
var slider;

function setup() {
    createCanvas(1000, 750);
    slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
    background(41);
    angle = slider.value();


    var seedLength = 150;


    stroke(240);
    translate(200, height);
    branch(seedLength * angle);
}


function getRandomMultiplier(){
    return random(0.8);
}

function branch(len) {
  strokeWeight(random(5))
  stroke(random(230), random(230), random(230));
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 20) {
    push();
    rotate(angle);
    branch(len * getRandomMultiplier());
    pop();
    push();
    rotate(-angle);
    branch(len * getRandomMultiplier());
    pop();
  }
}