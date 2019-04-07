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

	isVersus: boolean;

	constructor(isVersus) {
		this.canvas;
		this.ctx;
		this.render = this.render.bind(this);

		this.isVersus = isVersus;
	}

	init() {
		this.createCanvas();
		this.drawField();

		this.createPaddles();
		this.createBall();

		this.render();

		this.addListeners();

		addCanvasResize(this.canvas, this.ctx);
	}

	addListeners() {
		document.addEventListener('keydown', event => {
			const { key } = event;

			if (orientation === 'vertical') {
				if (key === 'a') this.paddle1.direction = DIRECTION.LEFT;
				else if (key === 'd') this.paddle1.direction = DIRECTION.RIGHT;

				if (this.isVersus) {
					if (key === 'ArrowLeft') this.paddle2.direction = DIRECTION.LEFT;
					else if (key === 'ArrowRight')
						this.paddle2.direction = DIRECTION.RIGHT;
				}
			} else {
				if (key === 'w') this.paddle1.direction = DIRECTION.UP;
				else if (key === 's') this.paddle1.direction = DIRECTION.DOWN;

				if (this.isVersus) {
					if (key === 'ArrowUp') this.paddle2.direction = DIRECTION.UP;
					else if (key === 'ArrowDown') this.paddle2.direction = DIRECTION.DOWN;
				}
			}
		});

		document.addEventListener('keyup', () => {
			this.paddle1.direction = DIRECTION.IDLE;

			if (this.isVersus) {
				this.paddle2.direction = DIRECTION.IDLE;
			}
		});
	}

	autoMove() {
		const changePos = this.paddle2.speed;
		if (orientation === 'vertical') {
			const ballPosX = this.ball.x - this.paddle2.width / 2;
			if (this.ball.directionY === DIRECTION.UP) {
				if (this.paddle2.x >= ballPosX) this.paddle2.x -= changePos;
				else if (this.paddle2.x <= ballPosX) this.paddle2.x += changePos;
			}

			// if (this.paddle1.x >= ballPosX) this.paddle1.x -= changePos;
			// else if (this.paddle1.x <= ballPosX) this.paddle1.x += changePos;
		} else {
			const ballPosY = this.ball.y - this.paddle2.height / 2;
			if (this.ball.directionX === DIRECTION.RIGHT) {
				if (this.paddle2.y >= ballPosY) this.paddle2.y -= changePos;
				else if (this.paddle2.y <= ballPosY) this.paddle2.y += changePos;
			}

			// if (this.paddle1.y >= ballPosY) this.paddle1.y -= changePos;
			// else if (this.paddle1.y <= ballPosY) this.paddle1.y += changePos;
		}
	}

	createBall() {
		this.ball = new Ball({
			ctx: this.ctx,
			canvas: this.canvas,
			ballSettings,
			paddle1: this.paddle1,
			paddle2: this.paddle2,
		});
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
			ball: this.ball,
			ctx: this.ctx,
			canvas: this.canvas,
			paddleSettings,
		});
		this.paddle1.render();
		this.paddle2 = new Paddle({
			ball: this.ball,
			ctx: this.ctx,
			canvas: this.canvas,
			paddleSettings,
			primary: false,
		});
		this.paddle2.render();
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

		if (!this.isVersus) {
			this.autoMove();
		}
	}

	render() {
		this.update();
		this.draw();
		requestAnimationFrame(this.render);
	}
}

// Is two player or not
const Game = new Pong(false);
Game.init();
