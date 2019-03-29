import { addCanvasResize } from './utils/events';

const width: number = window.innerWidth;
const height: number = window.innerHeight;

class Pong {
	canvas: HTMLCanvasElement;
	// ctx:

	constructor() {
		this.canvas;
		this.ctx;
	}

	init() {
		this.addCanvas();
		this.readyField();

		addCanvasResize(this.canvas, this.ctx);
	}

	addCanvas() {
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		const context = canvas.getContext('2d');

		document.body.append(canvas);

		this.canvas = canvas;
		this.ctx = context;
	}

	readyField() {
		this.canvas.fillStyle = '#ff00ff';
		this.ctx.fillRect(0, 0, width, height);
	}
}

const Game = new Pong();
Game.init();
