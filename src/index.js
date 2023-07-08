import React from 'react';
import ReactDOM from 'react-dom';
import Sketch from 'react-p5';
import './index.css';
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
	const canvasWidth = 800;
	const canvasHeight = 600;
	let startTime = 0;
	let elapsedTime = 0;
	let gameIsFinished = false

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
		p5.createCanvas(canvasWidth, canvasHeight).parent(parentRef);
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
		startTime = Date.now();
	};

	// Rest of your code
	let imageCache = {};

	const loadImage = (p5, url) => {
		// Check if the image has already been loaded
		if (!imageCache[url]) {
			// Load the image and save it in the cache
			imageCache[url] = p5.loadImage(url);
		}

		// Return the image from the cache
		return imageCache[url];
	};

	const showWordsPictures = (p5) => {
		const imageWidth = 40;
		const margin = 10; // margin between images
		const totalWidth = plate.words.length * (imageWidth + margin);
		plate.words.slice(plate.start).forEach((word, index) => {
			let img = loadImage(p5, word.picture);
			let x = canvasWidth / 2 - totalWidth / 2 + index * (imageWidth + margin);
			p5.image(img, x, 0, imageWidth, imageWidth); // adjust positioning as necessary
		});
	};

	const draw = (p5) => {
		p5.background(bg);
		// shirma
		p5.fill(255);
		p5.rect(-1, -1, 2400, 80);

		if (gameStarted) {
			if (plate.start === plate.words.length) {
				setTimeout(() => {
					gameIsFinished = true;
					gameStarted = false;
				}, 5000);
			}
			elapsedTime = (Date.now() - startTime) / 1000;
			plate.score = Math.round(plate.score);
			p5.background(bg);

			// shirma
			p5.fill(255);
			p5.rect(-1, -1, 2400, 80);

			showWordsPictures(p5);

			// scoring
			p5.fill(0);
			p5.textSize(32);
			p5.textAlign(p5.CENTER, p5.CENTER);
			p5.text(plate.score, 40, 20);

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

						// set pie to killed
						pie.killed = true;

						// get point for killing
						plate.score += 1;

						// exit the loop early as the bullet has been removed
						break;
					}
				}
			}

			for (let i = pies.length - 1; i > 0; i--) {
				const pie = pies[i];
				if (plate.catches(pie)) {
					if (!pie.checked) {
						pie.checked = true;
						plate.checkCaughtLetterIsMissing(pie);
					}
				} else if (pie.y > p5.height) {
					pies.splice(i, 1);
					plate.score += 1;
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

		if (gameIsFinished) {
			// final score
			let finalScore = plate.score - Math.floor(elapsedTime / 10);

			p5.fill(0);
			p5.textSize(32);
			p5.textAlign(p5.CENTER, p5.CENTER);
			p5.text(finalScore, 40, 20);
		}
	};

	return (
		<div className="App">
			<h1>Catch a Letter Game</h1>
			<button className="start-btn" onClick={startGame}>
				Start Game
			</button>
			{<Sketch preload={preload} setup={setup} draw={draw} mouseClicked={mouseClicked} />}
		</div>
	);
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
