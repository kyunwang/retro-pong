import { DIRECTION } from '../helpers/consts';
import { getFieldSettings } from '../helpers/utils';
const { orientation } = getFieldSettings();

class Ball {
	public ctx;
	public directionX: number;
	public directionY: number;

	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private xSpeed: number;
	private ySpeed: number;
	private speed: number;
	private paddle1;
	private paddle2;

	constructor(ctx, ballSettings, paddle1, paddle2) {
		const { size, yPos, xPos } = ballSettings;

		this.ctx = ctx;
		this.x = xPos;
		this.y = yPos;
		this.width = size;
		this.height = size;
		this.xSpeed = 0;
		this.ySpeed = 3;
		this.directionX = DIRECTION.IDLE;
		this.directionY = DIRECTION.UP;
		this.speed = 20;

		this.paddle1 = paddle1;
		this.paddle2 = paddle2;

		// this.init();
		this.render();
	}

	checkPaddle1() {
		if (orientation === 'vertical') {
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

			// Check scoring and reset?

			// Check boundary collision left

			// Check boundary collision right
		} else {
		}
	}

	checkPaddle2() {
		if (orientation === 'vertical') {
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
		}
	}

	update() {
		const posChange = this.speed / 1.5;
		// this.x += this.xSpeed;
		// this.y += this.ySpeed;
		if (this.directionY === DIRECTION.UP) this.y -= posChange;
		else if (this.directionY === DIRECTION.DOWN) this.y += posChange;
		if (this.directionX === DIRECTION.LEFT) this.x -= posChange;
		else if (this.directionX === DIRECTION.RIGHT) this.x += posChange;

		this.checkPaddle1();
		this.checkPaddle2();
	}

	render() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	init() {
		this.directionX = DIRECTION.LEFT;
		this.directionY = DIRECTION.DOWN;
		this.render();
	}
}

export default Ball;
