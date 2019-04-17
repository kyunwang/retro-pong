import { DIRECTION, ORIENTATION, GAME } from '../helpers/consts';
import { getFieldSettings, getBallSettings } from '../helpers/utils';
const { orientation } = getFieldSettings();
const { size, yPos, xPos } = getBallSettings();

class Ball {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	directionX: number;
	directionY: number;

	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private speed: number;
	private paddle1;
	private paddle2;

	resetGame: () => void;

	constructor({ ctx, canvas, reset, paddle1, paddle2 }) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.x = xPos;
		this.y = yPos;
		this.width = size;
		this.height = size;
		this.directionX = DIRECTION.IDLE;
		this.directionY = DIRECTION.IDLE;
		this.speed = 10;

		this.resetGame = reset;
		this.paddle1 = paddle1;
		this.paddle2 = paddle2;

		this.init();
		// this.render();
	}

	checkPaddle1() {
		if (orientation === ORIENTATION.VERTICAL) {
			// Check paddle1 collision
			// If collide with top of the paddle and is not beyond it
			if (
				this.y + this.height >= this.paddle1.y &&
				this.y <= this.paddle1.y + this.paddle1.height
			) {
				// Collide within the space of the paddle
				if (
					this.x <= this.paddle1.x + this.paddle1.width &&
					this.x + this.width >= this.paddle1.x
				) {
					this.y = this.paddle1.y - this.height;
					this.directionY = DIRECTION.UP;
				}
			}
		} else {
			if (
				this.x <= this.paddle1.x + this.paddle1.width &&
				this.x + this.width >= this.paddle1.x
			) {
				if (
					this.y <= this.paddle1.y + this.paddle1.height &&
					this.y + this.height >= this.paddle1.y
				) {
					this.x = this.paddle1.x + this.paddle1.width;
					this.directionX = DIRECTION.RIGHT;
				}
			}
		}
	}

	checkPaddle2() {
		if (orientation === ORIENTATION.VERTICAL) {
			if (
				this.y <= this.paddle2.y + this.paddle2.height &&
				this.y + this.height >= this.paddle2.y
			) {
				if (
					this.x <= this.paddle2.x + this.paddle2.width &&
					this.x + this.width >= this.paddle2.x
				) {
					this.y = this.paddle2.y + this.height;
					this.directionY = DIRECTION.DOWN;
				}
			}
		} else {
			if (
				this.x + this.width >= this.paddle2.x &&
				this.x <= this.paddle2.x + this.paddle2.width
			) {
				if (
					this.y <= this.paddle2.y + this.paddle2.height &&
					this.y + this.height >= this.paddle2.y
				) {
					this.x = this.paddle2.x - this.paddle2.width;
					this.directionX = DIRECTION.LEFT;
				}
			}
		}
	}

	update() {
		const posChange = this.speed / 1.5;

		if (this.directionY === DIRECTION.UP) this.y -= posChange;
		else if (this.directionY === DIRECTION.DOWN) this.y += posChange;
		if (this.directionX === DIRECTION.LEFT) this.x -= posChange;
		else if (this.directionX === DIRECTION.RIGHT) this.x += posChange;

		this.checkPaddle1();
		this.checkPaddle2();

		// Check scoring and reset?

		// Check boundary collision left & right
		if (orientation === ORIENTATION.VERTICAL) {
			if (this.x <= 0) this.directionX = DIRECTION.RIGHT;
			if (this.x >= this.canvas.width) this.directionX = DIRECTION.LEFT;
			if (this.y <= 0) this.resetGame(GAME.PADDLE_TWO);
			if (this.y - this.height >= this.canvas.height)
				this.resetGame(GAME.PADDLE_ONE);
		} else {
			if (this.x <= 0) this.resetGame(GAME.PADDLE_TWO);
			if (this.x - this.width >= this.canvas.width)
				this.resetGame(GAME.PADDLE_ONE);
			if (this.y <= 0) this.directionY = DIRECTION.DOWN;
			if (this.y >= this.canvas.height) this.directionY = DIRECTION.UP;
		}
	}

	reset() {
		this.x = xPos;
		this.y = yPos;
		this.speed = 10;
	}

	render() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	init() {
		this.directionX = DIRECTION.RIGHT;
		this.directionY = DIRECTION.DOWN;
		this.render();
	}
}

export default Ball;
