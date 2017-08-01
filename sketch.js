
var angle = 0;
var slider;


function setup() {
    createCanvas(1000, 750);
    slider = createSlider(0, TWO_PI, PI / 4, 0.01);
}

function draw() {
    background(51);
    angle = slider.value();
    stroke(240);
    translate(200, height);
    branch(150);
}


function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 20) {
    push();
    rotate(angle);
    branch(len * 0.75);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.75);
    pop();
  }
}