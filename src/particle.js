export class Particle {
	constructor(x, y, p5) {
		this.p5 = p5;
		this.pos = this.p5.createVector(x, y);
		this.vel = this.p5.createVector(this.p5.random(-1, 1), this.p5.random(-1, 1));
		this.acc = this.p5.createVector(0, 0);
		this.lifespan = 255;
	}

	applyForce(force) {
		this.acc.add(force);
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.lifespan -= 2;
	}

	show() {
		this.p5.stroke(255, this.lifespan);
		this.p5.strokeWeight(4);
		this.p5.point(this.pos.x, this.pos.y);
	}

	isDead() {
		return this.lifespan < 0;
	}
}
