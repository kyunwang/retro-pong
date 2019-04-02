import {
	addCanvasResize,
	requestAnimationFrame,
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
		this.readyField();

		this.createPaddles();
		this.createBall();

		this.render();

		addCanvasResize(this.canvas, this.ctx);
	}

	createCanvas() {
		const canvas = document.createElement('canvas');
		canvas.width = fieldW;
		canvas.height = fieldH;

		const context = canvas.getContext('2d');

		document.body.append(canvas);

		this.canvas = canvas;
		this.ctx = context;
	}

	createPaddles() {
		this.player1 = new Paddle(this.ctx, paddleSettings);

		this.player2 = new Paddle(this.ctx, paddleSettings, false);
	}

	createBall() {
		this.ball = new Ball(this.ctx, ballSettings);
	}

	readyField() {
		this.canvas.fillStyle = '#ff00ff';
		this.ctx.fillRect(0, 0, fieldW, fieldH);
	}

	render() {
		window.requestAnimationFrame(this.render);
	}
}

const Game = new Pong();
Game.init();
