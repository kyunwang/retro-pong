import { getFieldSettings, getPaddleSettings } from '../helpers/utils';
import { DIRECTION, ORIENTATION } from '../helpers/consts';
const { fieldW, fieldH, orientation } = getFieldSettings();
const { paddleW, paddleH, yDiff, xDiff } = getPaddleSettings();

class Paddle {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	direction: number;

	x: number;
	y: number;
	width: number;
	height: number;
	speed: number;

	constructor({ ball, ctx, canvas, primary = true }) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.x = xDiff;
		this.y = yDiff;
		this.width = paddleW;
		this.height = paddleH;
		this.speed = 9;

		if (orientation === ORIENTATION.VERTICAL) {
			this.y = primary ? fieldH - yDiff : yDiff - paddleH;
		} else {
			this.x = primary ? xDiff - paddleW : fieldW - xDiff;
		}
	}

	checkPaddle() {
		// Check boundary collision
		if (this.y <= 0) this.y = 0;
		else if (this.y >= this.canvas.height - this.height)
			this.y = this.canvas.height - this.height;

		if (this.x <= 0) this.x = 0;
		else if (this.x >= this.canvas.width - this.width)
			this.x = this.canvas.width - this.width;
	}

	update() {
		if (orientation === ORIENTATION.VERTICAL) {
			if (this.direction === DIRECTION.LEFT) this.x -= this.speed;
			else if (this.direction === DIRECTION.RIGHT) this.x += this.speed;
		} else {
			if (this.direction === DIRECTION.UP) this.y -= this.speed;
			else if (this.direction === DIRECTION.DOWN) this.y += this.speed;
		}

		this.checkPaddle();
	}

	render() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export default Paddle;
