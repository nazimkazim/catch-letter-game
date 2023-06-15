import bonus from './audio/bonus.mp3';
import hurtSound from './audio/hurt.mp3';
import { Particle } from './particle.js';
import { Firework } from './firework';

class Plate {
	constructor(x, w, p5) {
		this.x = x;
		this.w = w;
		this.h = 20;
		this.p5 = p5;
		this.start = 0;
		this.particles = [];
		this.fireworks = [];
		this.diamondWidth = 30;
		this.diamondGap = 10;
		this.y = p5.height - this.h;
		this.words = ['Good', 'Great', 'Awesome', 'Amazing', 'Fantastic', 'Wonderful', 'Incredible', 'Unbelievable'];
		this.word = this.words[this.start];
		this.numberOfGaps = this.p5.floor(this.p5.random(2, this.word.length - 2));
		this.bonusSound = new Audio(bonus);
		this.damage = new Audio(hurtSound);
		this.gapPositions = this.getGapPositions().map((num) => {
			return {
				position: num,
				filled: false,
			};
		});
		this.wordWithGaps = this.createAWordWithGapsAtRandomPositions();
		this.bg = p5.loadImage(
			'https://res.cloudinary.com/nzmai/image/upload/v1686227368/images%20for%20kahoot/diamond.png'
		);
	}

	getGapPositions() {
		let gapPositions = new Set();
		while (gapPositions.size < this.numberOfGaps) {
			let potentialGapPosition = this.p5.floor(this.p5.random(0, this.word.length));
			gapPositions.add(potentialGapPosition);
		}
		return Array.from(gapPositions);
	}

	getOnlyPositions(gapPositions) {
		return gapPositions.map((gap) => gap.position);
	}

	createAWordWithGapsAtRandomPositions() {
		let word = this.word;
		let wordWithGaps = '';
		for (let i = 0; i < word.length; i++) {
			if (this.getOnlyPositions(this.gapPositions).includes(i)) {
				wordWithGaps += '_';
			} else {
				wordWithGaps += word[i];
			}
		}
		return wordWithGaps;
	}

	createExplosion(x, y) {
		for (let i = 0; i < 10; i++) {
			this.particles.push(new Particle(x, y, this.p5));
		}
	}

	show() {
		const wordWithGap = this.wordWithGaps;
		//assuming diamondGap to be the gap between diamonds
		this.w = wordWithGap.length * this.diamondWidth + (wordWithGap.length - 1) + this.diamondGap;
		// show rectangle for the word
		// transparent white
		this.p5.fill(255, 255, 255, 0);
		this.p5.noStroke();
		this.p5.rectMode(this.p5.CENTER);
		//assuming diamondWidth to be the height of the plate
		this.p5.rect(this.x + this.w / 2, this.y, this.w, this.diamondWidth);

		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].update();
			this.particles[i].show();
			if (this.particles[i].isDead()) {
				this.particles.splice(i, 1);
			}
		}

		/* for (let i = this.fireworks.length - 1; i >= 0; i--) {
			this.fireworks[i].update();
			this.fireworks[i].show();

			if (this.fireworks[i].finished()) {
				this.fireworks.splice(i, 1);
			}
		} */
	}

	showWord() {
		const wordWithGap = this.wordWithGaps;

		wordWithGap.split('').forEach((letter, index) => {
			// Calculate the x position for each diamond and text
			let xPos = this.x + index * (this.diamondWidth + this.diamondGap);

			this.p5.imageMode(this.p5.CENTER);
			this.p5.image(this.bg, xPos, this.y, this.diamondWidth, this.diamondWidth);

			this.p5.fill(255); // white
			this.p5.textSize(32);
			this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
			this.p5.text(letter, xPos, this.y);
		});
	}

	catches(pie) {
		let leftEdge = this.x;
		let rightEdge = this.x + this.w;
		let topEdge = this.y - this.h / 2;
		let bottomEdge = this.y + this.h / 2;

		if (pie.y + pie.r >= topEdge && pie.y - pie.r <= bottomEdge && pie.x >= leftEdge && pie.x <= rightEdge) {
			return true;
		} else {
			return false;
		}
	}

	fillGapWithLetter(letter, position) {
		this.wordWithGaps =
			this.wordWithGaps.substring(0, position) + letter + this.wordWithGaps.substring(position + 1);
	}

	isWordComplete() {
		for (let gap of this.gapPositions) {
			if (!gap.filled) {
				return false;
			}
		}
		return true;
	}

	checkCaughtLetterIsMissing(pie) {
		const letter = pie.digit;
		let gapPositionsOrdered = this.gapPositions.sort((a, b) => a.position - b.position);
		let correctLetterFound = false;
		for (let i = 0; i < gapPositionsOrdered.length; i++) {
			if (this.word[gapPositionsOrdered[i].position].toLowerCase() === letter && !gapPositionsOrdered[i].filled) {
				gapPositionsOrdered[i].filled = true;
				this.fillGapWithLetter(letter, gapPositionsOrdered[i].position);
				pie.yspeed = 0;
				pie.bounceOffAndFall();
				this.bonusSound.play();
				correctLetterFound = true; /* 
				let firework = new Firework(pie.x, pie.y, this.p5);
				this.fireworks.push(firework); */
				break; // exit the loop as we have found the letter
			}
		}

		if (!correctLetterFound) {
			this.createExplosion(pie.x, pie.y);
			this.damage.play();
		}

		if (this.isWordComplete()) {
			this.start++;
			if (this.start < this.words.length) {
				this.word = this.words[this.start];
				this.numberOfGaps = this.p5.floor(this.p5.random(2, this.word.length - 2));
				this.gapPositions = this.getGapPositions().map((num) => {
					return {
						position: num,
						filled: false,
					};
				});
				this.wordWithGaps = this.createAWordWithGapsAtRandomPositions();
			}
		}
	}
}

export default Plate;
