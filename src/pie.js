import { Particle } from './particle.js';

let letterQueue = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];
letterQueue = letterQueue.concat(letterQueue); // doubling up the letter quantity for a longer sequence before refill

class Pie {
	constructor(x, y, letterBg, p5) {
		this.x = x;
		this.y = y;
		this.p5 = p5;
		this.r = 16;
		this.digit = this.generateRandomLetter();
		this.yspeed = 0;
		this.bg = letterBg;
		this.particles = [];
		this.dead = false;
		this.hit = false;
	}

	generateRandomLetter() {
		if (letterQueue.length === 0) {
			// Refill the queue when it's empty
			letterQueue = [
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z',
			];
			// Again, doubling up for a longer sequence before refill
			letterQueue = letterQueue.concat(letterQueue);
		}
		const randomIndex = Math.floor(Math.random() * letterQueue.length);
		// Remove the selected letter from the queue and return it
		return letterQueue.splice(randomIndex, 1)[0];
	}

	// add a new method to mark a pie as hit and move it out of the canvas
	markAsHit() {
		this.hit = true;
		this.x = -1000; // move it out of the canvas
		this.y = -1000; // move it out of the canvas
	}

	bounceOffAndFall() {
		this.y = this.y - 20;
		this.yspeed = this.yspeed + 0.01;
	}

	createExplosion(x, y) {
		for (let i = 0; i < 10; i++) {
			this.particles.push(new Particle(x, y, this.p5));
		}
	}

	show() {
		if (!this.dead) {
			this.p5.push(); // Save current drawing state

			// Move the origin to the pie's center
			this.p5.translate(this.x, this.y);

			// Rotate the pie
			let angle = this.p5.frameCount * 0.02; // Adjust speed of rotation as needed
			this.p5.rotate(angle);

			// Since the origin is now at the pie's center, draw the pie at (0, 0)
			this.p5.imageMode(this.p5.CENTER);
			this.p5.image(this.bg, 0, 0, this.r * 2, this.r * 2);

			this.p5.fill(0);
			this.p5.textSize(32);
			this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
			this.p5.text(this.digit, 0, 0);

			// Restore original drawing state
			this.p5.pop();
		}

		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].show();
			if (this.particles[i].isDead()) {
				this.particles.splice(i, 1);
			}
		}
	}

	update() {
		this.y = this.y + this.yspeed;
		this.yspeed = this.yspeed + 0.01;
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update();
			if (this.particles[i].isDead()) {
				this.particles.splice(i, 1);
			}
		}
	}
}

export default Pie;
