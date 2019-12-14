class Pipe {
    constructor() {
        this.pos = createVector(width, 0);
        this.space = (100/400)*height;
        this.len = random(height / 4, height / 2);
        this.passed = false;
    }
    outScreen() {
        if (this.pos.x < (-width - 10)) {
            return true;
        }
    }
    pass(bird){
        if (!this.passed && this.pos.x<bird.pos.x){
            this.passed=true;
            return true;
        } 
    }
    isCollide(bird) {
        let top = collideRectCircle(this.pos.x, this.pos.y, width / 20, this.len, bird.pos.x, bird.pos.y,bird.r);
        let bottom = collideRectCircle(this.pos.x,this.len + this.space, width / 20, height - (this.len + this.space), bird.pos.x, bird.pos.y, bird.r);
        if (top || bottom) {
            return true;
        }
    }
    update() {
        this.pos.x -= pipespeed;
    }
    show() {
        push();
        fill(255);
        noStroke();
        // rect(this.pos.x, this.pos.y, width / 20, this.len) hitbox top
        // rect(this.pos.x,this.len + this.space, width / 20, height - (this.len + this.space)) hitbox bottom
        image(pipeBotimg,this.pos.x,this.len + this.space, width / 10, height - (this.len + this.space)); //bottom
        image(pipeTopimg,this.pos.x, this.pos.y, width / 10, this.len); // top
        pop();
    }
}