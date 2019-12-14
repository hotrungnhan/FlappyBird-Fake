let gra;
let pipespeed;
let pipenewspeed;
let bound;
let pipes = [];
let bird;
let isStart = true, isOver = false;
let score = 0, best = 0;
let birdimg, bgimg, pipeBotimg, pipeTopimg;
let wingSfx, pointSfx;
function preload() {
    wingSfx = loadSound('assets/sfx_wing.mp3')
    pointSfx = loadSound('assets/sfx_point.mp3')
    bgimg = loadImage('assets/background.png');
    birdimg = loadImage('assets/bird.png');
    pipeTopimg = loadImage('assets/pipeTop.png');
    pipeBotimg = loadImage('assets/pipeBottom.png');
}
function setup() {
    createCanvas(400, 400);
    gra = (0.1 / 400) * height;
    pipespeed = (3 / 400) * width;
    pipenewspeed = 60;
    bird = new Bird;
    bound = new Boundary(bird);
   
}
function draw() {
    background(bgimg);
    if (frameCount % pipenewspeed == 0 && !isOver) {
        pipes.push(new Pipe);
    }
    update();
    if (bound.isCollide(bird)){
        isOver=true;
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
            pointSfx.play()
        }
        if (pipe.outScreen()) {
            pipes.shift();
        }
        if (pipe.isCollide(bird)) {
            isOver = true;
        }
        pipe.update();
        pipe.show();
    }
    scoreShow();
    bird.update();
    bird.show();
    bound.show()
}
function scoreShow() {
    push();
    textSize(32);
    fill('#ff9966');
    textAlign(CENTER, CENTER);
    text(score, width / 2, height / 4);;
    textAlign(LEFT, BASELINE);
    pop();
}

function gamestart() {
    noLoop();
    background(bgimg);
    push();
    fill('#ff9966');
    textSize(64);
    textAlign(CENTER, CENTER);
    text(`Press Space\nTo play Game`, width / 2, height / 2);
    pop();
}

function gameover() {
    noLoop();
    (score >= best) ? best = score : 1;
    background(bgimg);
    push();
    fill('#ff9966');
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
        }
        else {
            bird.fly();
        }
    }
    return false;
}
function touchStarted(){

    if (isOver || isStart) {
        isStart = false;
        reset();
    }
    else {
        bird.fly();
    }
    return false;
}