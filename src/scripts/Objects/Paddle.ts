import { getFieldSettings } from '../helpers/utils';
import { DIRECTION } from '../helpers/consts';
const { fieldW, fieldH, orientation } = getFieldSettings();

class Paddle {
	public ctx;
	public direction: number;
	public isPlayer: boolean;

	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public speed: number;

	constructor({ ctx, paddleSettings, primary = true, isPlayer = false }) {
		const { paddleW, paddleH, yDiff, xDiff } = paddleSettings;

		this.ctx = ctx;
		this.x = xDiff;
		this.y = yDiff;
		this.width = paddleW;
		this.height = paddleH;
		this.speed = 9;
		this.isPlayer = isPlayer;

		if (orientation === 'vertical') {
			this.y = primary ? fieldH - yDiff : yDiff - paddleH;
		} else {
			this.x = primary ? xDiff - paddleW : fieldW - xDiff;
		}

		// this.render();
	}

	move(x) {
		this.x = x;
	}

	update() {
		if (orientation === 'vertical') {
			if (this.direction === DIRECTION.LEFT) {
				this.x -= this.speed;
			} else if (this.direction === DIRECTION.RIGHT) {
				this.x += this.speed;
			}
		} else {
			if (this.direction === DIRECTION.UP) {
				this.y -= this.speed;
			} else if (this.direction === DIRECTION.DOWN) {
				this.y += this.speed;
			}
		}
	}

	render() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export default Paddle;
