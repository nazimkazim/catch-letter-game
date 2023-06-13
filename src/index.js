import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import './styles.css';
import Pie from './pie';
import Plate from './plate.js';


const App = () => {
	let digits = '';
	let digitsDiv;
	let pies = [];
	let plate;
	let bg = '';
	let letterBg = '';

	const preload = (p5) => {
        bg = p5.loadImage('https://res.cloudinary.com/nzmai/image/upload/v1686221906/images%20for%20kahoot/cosmic-background.jpg');
		letterBg = p5.loadImage('https://res.cloudinary.com/nzmai/image/upload/v1686227368/images%20for%20kahoot/diamond.png');
    };

	const setup = (p5, parentRef) => {
		p5.createCanvas(800, 400).parent(parentRef);
		digitsDiv = p5.createDiv(digits);
		plate = new Plate(p5.width / 2, 50, p5);
	};

	const draw = (p5) => {
		p5.clear();
		p5.background(0);
		if (p5.random(1) < 0.03) {
			pies.push(new Pie(p5.random(p5.width), p5.random(-100, -20), letterBg, p5));
		}

		for (let pie of pies) {
			pie.show();
			pie.update();
		}

		for (let i = pies.length - 1; i > 0; i--) {
			if (plate.catches(pies[i])) {
				plate.checkCaughtLetterIsMissing(pies[i]);
				pies.splice(i, 1);
			} else if (pies[i].y > p5.height + pies[i].r) {
				pies[i].bounceOffAndFall()
				// pies.splice(i, 1);
			}
		}
		plate.x = p5.mouseX;
		plate.show();
		plate.showWord();
		p5.rectMode(p5.CENTER);
	};

	return (
		<div className="App">
			<h1>Catch a Letter Game</h1>
			<Sketch preload={preload} setup={setup} draw={draw} />
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
