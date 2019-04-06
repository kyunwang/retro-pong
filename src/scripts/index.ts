import {
	addCanvasResize,
	// requestAnimationFrame,
	getFieldSettings,
	getPaddleSettings,
	getBallSettings,
} from './helpers/utils';
import Ball from './Objects/Ball';
import Paddle from './Objects/Paddle';
import { DIRECTION } from './helpers/consts';

const { fieldW, fieldH, orientation } = getFieldSettings();
const paddleSettings = getPaddleSettings();
const ballSettings = getBallSettings();

class Pong {
	canvas: HTMLCanvasElement;
	ctx;
	paddle1;
	paddle2;
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
		// Create and initial render
		this.paddle1 = new Paddle({
			ctx: this.ctx,
			paddleSettings,
			isPlayer: true,
		});
		this.paddle1.render();
		this.paddle2 = new Paddle({
			ctx: this.ctx,
			paddleSettings,
			primary: false,
		});
		this.paddle2.render();

		document.addEventListener('keydown', event => {
			const { key } = event;
			if (orientation === 'vertical') {
				if (key === 'ArrowLeft') {
					this.paddle1.direction = DIRECTION.LEFT;
				}
				if (key === 'ArrowRight') {
					this.paddle1.direction = DIRECTION.RIGHT;
				}
			} else {
				if (key === 'ArrowUp') {
					this.paddle1.direction = DIRECTION.UP;
				} else if (key === 'ArrowDown') {
					this.paddle1.direction = DIRECTION.DOWN;
				}
			}
		});

		document.addEventListener('keyup', () => {
			this.paddle1.direction = DIRECTION.IDLE;
		});
	}

	createBall() {
		this.ball = new Ball(
			this.ctx,
			this.canvas,
			ballSettings,
			this.paddle1,
			this.paddle2
		);
	}

	drawField() {
		this.ctx.fillStyle = '#000000';
		this.ctx.fillRect(0, 0, fieldW, fieldH);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.drawField();

		this.paddle1.render();
		this.paddle2.render();
		this.ball.render();
	}

	update() {
		this.paddle1.update();
		this.paddle2.update();
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
