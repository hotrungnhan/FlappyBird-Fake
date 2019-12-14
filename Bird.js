class Bird {
    constructor() {
        this.pos = createVector(width / 8, height / 2);
        this.vec = createVector();
        this.r = width / 20;
    }
    fly() {
        this.vec.set(0, 0);
        this.vec.add(0, (-3/400)*height);
        this.pos.add(this.vec);
        wingSfx.play();
    }
    update() {
        this.pos.add(this.vec);
        this.vec.y += gra;
    }
    show() {
        push()
        imageMode(CENTER)
        translate(this.pos.x, this.pos.y)
        rotate(map(this.vec.y, -3, 6, -PI/4, PI/4))
        // circle(0, 0, this.r) hitbox
        image(birdimg, 0, 0, this.r, this.r);
        pop()
    }
}

