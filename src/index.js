import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import './styles.css';
import { Pie, SpecialPie } from './pie';
import Plate from './plate.js';
import { Bullet } from './bullet.js';
import 'p5/lib/addons/p5.sound';
import { Particle } from './particle';
import laser from './audio/laser-gun.mp3';
import crack from './audio/crack.mp3';

const App = () => {
	let pies = [];
	let bullets = [];
	let particles = [];
	let plate;
	let bg = '';
	let letterBg = '';
	let specialLetterBg = '';
	let laserSound = new Audio(laser);
	let crackSound = new Audio(crack);
	let gameStarted = false;

	const preload = (p5) => {
		bg = p5.loadImage(
			'https://res.cloudinary.com/nzmai/image/upload/v1686221906/images%20for%20kahoot/cosmic-background.jpg'
		);
		letterBg = p5.loadImage(
			'https://res.cloudinary.com/nzmai/image/upload/v1686227368/images%20for%20kahoot/diamond.png'
		);

		specialLetterBg = p5.loadImage(
			'https://res.cloudinary.com/nzmai/image/upload/v1687007388/images%20for%20kahoot/special_diamond.png'
		);
		p5.soundFormats('mp3', 'ogg');
	};

	const setup = (p5, parentRef) => {
		p5.createCanvas(800, 400).parent(parentRef);
		plate = new Plate(p5.width / 2, 50, p5);
	};

	const mouseClicked = (p5) => {
		// play sound
		laserSound.play();
		let bullet = new Bullet(p5.mouseX, p5.mouseY, plate.x, plate.y, p5);
		bullets.push(bullet);
	};

	const createExplosion = (x, y, p5) => {
		for (let i = 0; i < 10; i++) {
			particles.push(new Particle(x, y, p5));
		}
	};

	const startGame = () => {
		gameStarted = true;
	};

	const draw = (p5) => {
		if (gameStarted) {
		p5.clear();
		p5.background(0);
		if (p5.random(1) < 0.03) {
			if (p5.random(1) < 0.1) {
				// 10% chance to create a SpecialPie
				pies.push(new SpecialPie(p5.random(p5.width), p5.random(-100, -20), specialLetterBg, p5));
			} else {
				pies.push(new Pie(p5.random(p5.width), p5.random(-100, -20), letterBg, p5));
			}
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
					// play crack sound
					crackSound.play();
					// create explosion
					createExplosion(pie.x, pie.y, p5);
					// remove pie
					pies.splice(j, 1);
					// remove bullet
					bullets.splice(i, 1);
					// exit the loop early as the bullet has been removed
					break;
				}
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

		for (let i = particles.length - 1; i >= 0; i--) {
			particles[i].update();
			particles[i].show();
			if (particles[i].isDead()) {
				particles.splice(i, 1);
			}
		}

		plate.x = p5.mouseX;
		plate.show();
		plate.showWord();
		p5.rectMode(p5.CENTER);
		}
	};

	return (
		<div className="App">
			<h1>Catch a Letter Game</h1>
			<button onClick={startGame}>Start Game</button>
			{<Sketch preload={preload} setup={setup} draw={draw} mouseClicked={mouseClicked} />}
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
