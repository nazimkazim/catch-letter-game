class Plate {
	constructor(x, w, p5) {
		this.x = x;
		this.w = w;
		this.h = 20;
		this.p5 = p5;
		this.y = p5.height - this.h;
		this.word = p5.random(['Good', 'Great', 'Awesome', 'Amazing', 'Fantastic', 'Wonderful', 'Incredible', 'Unbelievable']);
		this.w = 100;
		this.numberOfGaps = this.p5.floor(this.p5.random(2, this.word.length - 2));
		this.gapPositions = this.getGapPositions().map((num) => {
			return {
				position: num,
				filled: false,
			}
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


	show() {
		this.p5.fill(255);
		this.p5.rectMode(this.p5.CENTER);
		this.p5.rect(this.x, this.y, this.w, this.h);
	}

	getOnlyPositions(gapPositions) {
		return gapPositions.map((gap) => gap.position);
	}

	createAWordWithGapsAtRandomPositions() {
		let word = this.word;
		let wordWithGaps = '';
		// console.log(this.gapPositions);

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
		// console.log(this.createAWordWithGapsAtRandomPositions());
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

	checkCaughtLetterIsMissing(pie) {
		const letter = pie.digit;
		// Sort the gaps
		let gapPositionsOrdered = this.gapPositions.sort((a, b) => a.position - b.position);
		// Go through all the gaps
		for (let i = 0; i < gapPositionsOrdered.length; i++) {
			// If the letter at the gap position in the word matches the caught letter and the gap is not filled yet
			if (this.word[gapPositionsOrdered[i].position].toLowerCase() === letter && !gapPositionsOrdered[i].filled) {
				// Fill the gap and set it as filled
				gapPositionsOrdered[i].filled = true;
				this.fillGapWithLetter(letter, gapPositionsOrdered[i].position);
				console.log('caught');
				return true;
			}
		}
		return false;
	}
}

export default Plate;
