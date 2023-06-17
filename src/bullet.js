export class Bullet {
    constructor(mouseX, mouseY, plateX, plateY, p5) {
        this.p5 = p5;
        this.pos = p5.createVector(plateX, plateY);
        this.mousePos = p5.createVector(mouseX, mouseY);
        let dx = this.mousePos.x - this.pos.x;
        let dy = this.mousePos.y - this.pos.y;
        let mag = Math.sqrt(dx * dx + dy * dy);
        dx = dx / mag;
        dy = dy / mag;
        dx = dx * 10;
        dy = dy * 10;
        this.vel = p5.createVector(dx, dy);
        this.acc = p5.createVector(0, 0);
        this.lifespan = 255;
    }
    

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show() {
        this.p5.stroke(255);
        this.p5.strokeWeight(4);
        this.p5.point(this.pos.x, this.pos.y);
    }

    isDead() {
        return (this.pos.y < 0 || this.pos.x < 0 || this.pos.x > this.p5.width);
    }
}
