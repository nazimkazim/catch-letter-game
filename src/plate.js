class Plate {
	constructor(x, w, p5) {
		this.x = x;
		this.w = w;
		this.h = 20;
		this.p5 = p5;
		this.start = 0;
		this.y = p5.height - this.h;
		this.words = ['Good', 'Great', 'Awesome', 'Amazing', 'Fantastic', 'Wonderful', 'Incredible', 'Unbelievable'];
		this.word = this.words[this.start]
		this.w = 100;
		this.numberOfGaps = this.p5.floor(this.p5.random(2, this.word.length - 2));
		this.gapPositions = this.getGapPositions().map((num) => {
			return {
				position: num,
				filled: false,
			}
		});
		this.wordWithGaps = this.createAWordWithGapsAtRandomPositions();
		this.bg = p5.loadImage('https://res.cloudinary.com/nzmai/image/upload/v1686221906/images%20for%20kahoot/cosmic-background.jpg');
	}

	getGapPositions() {
		let gapPositions = new Set();
		while (gapPositions.size < this.numberOfGaps) {
			let potentialGapPosition = this.p5.floor(this.p5.random(0, this.word.length));
			gapPositions.add(potentialGapPosition);
		}
		return Array.from(gapPositions);
	}


	show() {
		this.p5.fill(255);
		this.p5.noStroke();
		this.p5.rectMode(this.p5.CENTER);
		this.p5.rect(this.x, this.y, this.w, this.h);
		// this.p5.background(this.bg);
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

	showWord() {
		const wordWithGap = this.wordWithGaps;
		this.p5.fill(0);
		this.p5.textSize(32);
		this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
		this.w = this.p5.textWidth(this.word) + 20;
		this.h = this.p5.textAscent() + this.p5.textDescent();
		this.p5.text(wordWithGap, this.x, this.y);
	}

	catches(pie) {
		if (pie.y + pie.r >= this.y && pie.x > this.x - this.w / 2 && pie.x < this.x + this.w / 2) {
			return true;
		} else {
			return false;
		}
	}

	fillGapWithLetter(letter, position) {
		this.wordWithGaps = this.wordWithGaps.substring(0, position) + letter + this.wordWithGaps.substring(position + 1);
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
		for (let i = 0; i < gapPositionsOrdered.length; i++) {
			if (this.word[gapPositionsOrdered[i].position].toLowerCase() === letter && !gapPositionsOrdered[i].filled) {
				gapPositionsOrdered[i].filled = true;
				this.fillGapWithLetter(letter, gapPositionsOrdered[i].position);
			}
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
					}
				});
				this.wordWithGaps = this.createAWordWithGapsAtRandomPositions();
			}
		}
		

	}
}

export default Plate;
