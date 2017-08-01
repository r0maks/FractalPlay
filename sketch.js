
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
    translate(500, height);
    branch(seedLength * angle);
}


// TODO add a control to add number of branches to the process
// Color bar
// Integrate with angular controller?
// TODO add a color picker

function getRandomMultiplier() {
    return random(0, .75);
}

function branch(len) {
    strokeWeight(random(5))

    stroke(random(100, 255), random(0, 80), random(0, 80));

    line(0, 0, 0, -len);
    translate(0, -len);

    var inc = 1;
    for (var i = 0; i < 2; i++) {
        if (len > 4) {
            push();
            rotate((angle ) * inc);
            branch(len * .7);
            pop();
            inc = inc * -1;
        }
    }

}