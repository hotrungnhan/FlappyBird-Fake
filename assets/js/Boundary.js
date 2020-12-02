class Boundary {
    constructor(bird) {
        this.pos = createVector(bird.pos.x, 0);
    }

    isCollide(bird) {
        let top = collidePointCircle(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y, bird.r);
        let bottom = collidePointCircle(this.pos.x, height - this.pos.y, bird.pos.x, bird.pos.y, bird.r);
        if (top || bottom) {
            return true;
        }
    }
    show() {
        point(this.pos.x, this.pos.y);
        rect(this.pos.x, height - this.pos.y);
    }
}