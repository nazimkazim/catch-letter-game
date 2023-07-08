import bonus from './audio/bonus.mp3';
import hurtSound from './audio/hurt.mp3';
import nextRound from './audio/next-round.mp3';
import { Particle } from './particle.js';
import Rabbit from './img/rabbit.png';
import Snake from './img/snake.png';
import Bull from './img/bull.png';
// import { Firework } from './firework';

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
		this.words = [
			{
				word: 'Rabbit',
				picture: Rabbit,
			},
			{
				word: 'Snake',
				picture: Snake,
			},
			{
				word: 'Bull',
				picture: Bull,
			},
			{
				word: 'Dog',
				picture: './img/dog.png',
			},
			{
				word: 'Lion',
				picture: './img/lion.png',
			},
		];
		this.word = this.words[this.start].word;
		this.picture = this.words[this.start].picture;
		this.numberOfGaps = this.p5.floor(this.p5.random(2, this.word.length - 2));
		this.bonusSound = new Audio(bonus);
		this.damage = new Audio(hurtSound);
		this.nextRound = new Audio(nextRound);
		this.score = 0;

		this.gapPositions = this.getGapPositions().map((num) => {
			return {
				position: num,
				filled: false,
			};
		});
		this.wordWithGaps = this.createAWordWithGapsAtRandomPositions();
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
				wordWithGaps += ' ';
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
		const rotationSpeed = 0.01;

		wordWithGap.split('').forEach((letter, index) => {
			// Calculate the x position for each diamond and text
			let xPos = this.x + index * (this.diamondWidth + this.diamondGap);

			this.drawDiamond({
				speed: rotationSpeed,
				color: '#4C05A9',
				edges: 8,
				xPos: xPos,
			});

			// white text
			this.p5.fill(255);
			this.p5.textSize(32);
			this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
			this.p5.text(letter, xPos, this.y);
		});
	}

	drawDiamond({ speed, color, edges, xPos }) {
		// Draw a spinning diamond
		this.p5.push(); // Start a new drawing state
		this.p5.translate(xPos, this.y); // Move to the position of the diamond
		this.p5.rotate(this.p5.frameCount * speed); // Rotate based on the frame count

		this.p5.fill(color); // light blue color
		this.p5.noStroke();

		// Draw a 6-sided polygon (diamond)
		this.p5.beginShape();
		for (let a = 0; a < this.p5.TWO_PI; a += this.p5.TWO_PI / edges) {
			let sx = 0 + (this.diamondWidth / 2) * this.p5.cos(a);
			let sy = 0 + (this.diamondWidth / 2) * this.p5.sin(a);
			this.p5.vertex(sx, sy);
		}
		this.p5.endShape(this.p5.CLOSE);

		this.p5.pop(); // Restore original drawing state
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
				correctLetterFound = true;
				this.score += 2;
				/* 
				let firework = new Firework(pie.x, pie.y, this.p5);
				this.fireworks.push(firework); 
				*/
				// exit the loop as we have found the letter
				break;
			}
		}

		if (!correctLetterFound && letter.length > 0) {
			this.createExplosion(pie.x, pie.y);
			this.damage.play();
			this.score -= 5;
		} else if (!correctLetterFound && letter === '') {
			this.createExplosion(pie.x, pie.y);
			this.nextRound.play();
			this.score += 20;
		}

		if (this.isWordComplete()) {
			this.start++;
			if (this.start < this.words.length) {
				this.word = this.words[this.start].word;
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
