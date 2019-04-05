import {
	addCanvasResize,
	// requestAnimationFrame,
	getFieldSettings,
	getPaddleSettings,
	getBallSettings,
} from './helpers/utils';
import Ball from './Objects/Ball';
import Paddle from './Objects/Paddle';

const { fieldW, fieldH, orientation } = getFieldSettings();
const paddleSettings = getPaddleSettings();
const ballSettings = getBallSettings();

class Pong {
	canvas: HTMLCanvasElement;
	ctx;
	player1;
	player2;
	ball;

	constructor() {
		this.canvas;
		this.ctx;
		this.render = this.render.bind(this);
	}

	init() {
		this.createCanvas();
		this.drawField();

		this.createPaddles();
		this.createBall();

		this.render();

		addCanvasResize(this.canvas, this.ctx);
	}

	createCanvas() {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		canvas.width = fieldW;
		canvas.height = fieldH;

		canvas.style.width = `${canvas.width / 2}px`;
		canvas.style.height = `${canvas.height / 2}px`;

		document.body.append(canvas);

		this.canvas = canvas;
		this.ctx = context;
	}

	createPaddles() {
		this.player1 = new Paddle(this.ctx, paddleSettings);
		this.player1.render();
		this.player2 = new Paddle(this.ctx, paddleSettings, false);

		window.addEventListener('keydown', event => {
			if (orientation === 'vertical') {
				switch (event.code) {
					case 'ArrowLeft':
						console.log(this.player1.x);

						this.player1.x -= 9;
						break;
					case 'ArrowRight':
						break;
					case 'KeyA':
						break;
					case 'KeyD':
						break;
					default:
						return;
				}
			}
		});
	}

	createBall() {
		this.ball = new Ball(this.ctx, ballSettings);
	}

	drawField() {
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, fieldW, fieldH);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawField();

		this.player1.render();
		this.ball.render();
	}

	update() {
		this.player1.update();
		this.ball.update();
	}

	render() {
		this.update();
		this.draw();
		requestAnimationFrame(this.render);
	}
}

const Game = new Pong();
Game.init();
