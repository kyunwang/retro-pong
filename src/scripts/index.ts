import { addCanvasResize, requestAnimationFrame } from './helpers/utils';
import Ball from './Objects/Ball';
import Paddle from './Objects/Paddle';

const wWidth: number = window.innerWidth;
const wHeight: number = window.innerHeight;

const aspectRatio = wWidth / wHeight;

const paddleSettings = {
	width: 50,
	height: 10,
	yDiff: wHeight * 0.1,
	xDiff: wWidth * 0.5 - 50 / 2,
};
const ballSettings = {
	size: 5,
	yPos: wHeight * 0.5 - 2.5,
	xPos: wWidth * 0.5 - 5 / 2,
};

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
		canvas.width = wWidth;
		canvas.height = wHeight;

		const context = canvas.getContext('2d');

		document.body.append(canvas);

		this.canvas = canvas;
		this.ctx = context;
	}

	createPaddles() {
		const { width, height, yDiff, xDiff } = paddleSettings;

		this.player1 = new Paddle(this.ctx, xDiff, wHeight - yDiff, width, height);

		this.player2 = new Paddle(this.ctx, xDiff, yDiff - height, width, height);
	}

	createBall() {
		const { size, yPos, xPos } = ballSettings;

		this.ball = new Ball(this.ctx, xPos, yPos, size, size);
	}

	readyField() {
		this.canvas.fillStyle = '#ff00ff';
		this.ctx.fillRect(0, 0, wWidth, wHeight);
	}

	render() {
		window.requestAnimationFrame(this.render);
	}
}

const Game = new Pong();
Game.init();
