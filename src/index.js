/*
 * For Tips and Advanced Usage read this Blog Post
 * https://levelup.gitconnected.com/integrating-p5-sketches-into-your-react-app-de44a8c74e91
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import './styles.css';
import Pie from './pie';
import Plate from './plate.js';

const App = () => {
	let digits = '3.';
	let digitsDiv;
	let pies = [];
	let plate;
	const setup = (p5, parentRef) => {
		p5.createCanvas(800, 400).parent(parentRef);
		digitsDiv = p5.createDiv(digits);
		plate = new Plate(p5.width / 2, 50, p5);
	};

	const draw = (p5) => {
		if (p5.random(1) < 0.03) {
			pies.push(new Pie(p5.random(p5.width), p5.random(-100, -20), p5));
		}
		p5.background(0);

		for (let pie of pies) {
			pie.show();
			pie.update();
		}

		for (let i = pies.length - 1; i > 0; i--) {
			if (plate.catches(pies[i])) {
				plate.checkCaughtLetterIsMissing(pies[i]);
				digits += pies[i].digit;
				digitsDiv.html(digits);
				pies.splice(i, 1);
			} else if (pies[i].y > p5.height + pies[i].r) {
				pies.splice(i, 1);
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
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
