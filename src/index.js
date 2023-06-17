import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import './styles.css';
import Pie from './pie';
import Plate from './plate.js';
import { Bullet } from './bullet.js';
import 'p5/lib/addons/p5.sound';

const App = () => {
	let digits = '';
	let digitsDiv;
	let pies = [];
	let bullets = [];
	let plate;
	let bg = '';
	let letterBg = '';

	const preload = (p5) => {
		bg = p5.loadImage(
			'https://res.cloudinary.com/nzmai/image/upload/v1686221906/images%20for%20kahoot/cosmic-background.jpg'
		);
		letterBg = p5.loadImage(
			'https://res.cloudinary.com/nzmai/image/upload/v1686227368/images%20for%20kahoot/diamond.png'
		);
		p5.soundFormats('mp3', 'ogg');
	};

	const setup = (p5, parentRef) => {
		p5.createCanvas(800, 400).parent(parentRef);
		digitsDiv = p5.createDiv(digits);
		plate = new Plate(p5.width / 2, 50, p5);
	};

	const mouseClicked = (p5) => {
		let bullet = new Bullet(p5.mouseX, p5.mouseY, plate.x, plate.y, p5);
		bullets.push(bullet);
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

		for (let i = bullets.length - 1; i >= 0; i--) {
			const bullet = bullets[i];
			bullet.update();
			bullet.show();

			for (let j = pies.length - 1; j >= 0; j--) {
				let pie = pies[j];
				let d = p5.dist(bullet.pos.x, bullet.pos.y, pie.x, pie.y);
				if (d < pie.r) {
					// collision detected, create explosion
					pie.createExplosion(pie.x, pie.y);
					// remove bullet
					bullets.splice(i, 1);
					// set a 'dead' flag on the pie, instead of removing it immediately
					pie.dead = true;
					// exit the loop early as the bullet has been removed
					break;
				}
			}	

			if (bullet.isDead()) {
				bullets.splice(i, 1);
			}
		}

		for (let i = pies.length - 1; i > 0; i--) {
			const pie = pies[i];
			if (plate.catches(pie)) {
				plate.checkCaughtLetterIsMissing(pie);
			} else if (pie.y > p5.height) {
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
			<Sketch preload={preload} setup={setup} draw={draw} mouseClicked={mouseClicked} />
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
