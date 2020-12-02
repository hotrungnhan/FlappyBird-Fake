let gra;
let pipespeed;
let pipenewspeed;
let bound;
let pipes = [];
let bird;
let isStart = true,
    isOver = false;
let score = 0,
    best = 0;
let assets = {
    images: {},
    sfx: {},
};
function preload() {
    assets.sfx.wing = loadSound("assets/sounds/sfx_wing.mp3");
    assets.sfx.point = loadSound("assets/sounds/sfx_point.mp3");
    assets.sfx.hit = loadSound(
        "assets/sounds/Hit - Sound Effect (mp3cut.net).mp3"
    );
    assets.sfx.fall = loadSound(
        "assets/sounds/Fall-Down-On-Wood-A1-www (mp3cut.net).mp3"
    );
    assets.images.bg = loadImage("assets/images/background.png");
    assets.images.bird = loadImage("assets/images/bird.png");
    assets.images.toppipe = loadImage("assets/images/pipeTop.png");
    assets.images.bottompipe = loadImage("assets/images/pipeBottom.png");
}
function setup() {
    createCanvas(windowWidth, windowHeight, P2D);
    gra = (0.1 / 400) * height;
    pipespeed = (3 / 400) * width;
    pipenewspeed = 60;
    bird = new Bird();
    bound = new Boundary(bird);
}
function draw() {
    background(assets.images.bg);
    if (frameCount % pipenewspeed == 0 && !isOver) {
        pipes.push(new Pipe());
    }
    update();
    if (bound.isCollide(bird)) {
        isOver = true;
    }
    if (isOver) {
        gameover();
    }
    if (isStart) {
        gamestart();
    }
}
function update() {
    for (let pipe of pipes) {
        if (pipe.pass(bird)) {
            score++;
            assets.sfx.point.play();
        }
        if (pipe.outScreen()) {
            pipes.shift();
        }
        if (pipe.isCollide(bird)) {
            isOver = true;
            assets.sfx.hit.play();
        }
        pipe.update();
        pipe.show();
    }
    scoreShow();
    bird.update();
    bird.show();
    bound.show();
}
function scoreShow() {
    push();
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height / 4 - 2, width / 30, height / 20, 8);
    textSize(32);
    fill("#ff9966");
    textAlign(CENTER, CENTER);
    text(score, width / 2, height / 4);
    textAlign(LEFT, BASELINE);
    pop();
}

function gamestart() {
    noLoop();
    background(assets.images.bg);
    push();
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height / 2, width / 2, height / 2, 20);
    fill("#ff9966");
    textSize(64);
    textAlign(CENTER, CENTER);
    text(`Press Space\nTo play Game`, width / 2, height / 2);
    pop();
}

function gameover() {
    noLoop();
    score >= localStorage.getItem("bestpoint")
        ? () => {
              best = score;
              localStorage.setItem("bestpoint", best);
          }
        : 1;
    background(assets.images.bg);
    push();
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height / 2, width / 2, height / 2, 20);
    fill("#ff9966");
    textSize(64);
    textAlign(CENTER, CENTER);
    text(`GAMEOVER\nBest ${best}`, width / 2, height / 2);
    textAlign(LEFT, BASELINE);
    pop();
    isOver = true;
}

function reset() {
    isOver = false;
    score = 0;
    pipes = [];
    bird = new Bird();
    loop();
}
function keyPressed() {
    if (keyCode == 32) {
        if (isOver || isStart) {
            isStart = false;
            reset();
        } else {
            bird.fly();
        }
    }
    return false;
}
function touchStarted() {
    if (isOver || isStart) {
        isStart = false;
        reset();
    } else {
        bird.fly();
    }
    return false;
}
