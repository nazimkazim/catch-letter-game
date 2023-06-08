let letterQueue = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
letterQueue = letterQueue.concat(letterQueue); // doubling up the letter quantity for a longer sequence before refill

class Pie {
	constructor(x, y, p5) {
		this.x = x;
		this.y = y;
		this.p5 = p5;
		this.r = 16;
		this.digit = this.generateRandomLetter();
		this.yspeed = 0;
	}

	generateRandomLetter() {
		if (letterQueue.length === 0) {
			// Refill the queue when it's empty
			letterQueue = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			letterQueue = letterQueue.concat(letterQueue); // Again, doubling up for a longer sequence
		}
		const randomIndex = Math.floor(Math.random() * letterQueue.length);
		return letterQueue.splice(randomIndex, 1)[0]; // Remove the selected letter from the queue
	}

	show() {
		this.p5.fill(255);
		this.p5.circle(this.x, this.y, this.r * 2);
		this.p5.fill(0);
		this.p5.textSize(32);
		this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.p5.text(this.digit, this.x, this.y);
	}

	update() {
		this.y = this.y + this.yspeed;
		this.yspeed = this.yspeed + 0.01;
	}
}

export default Pie;
