import { getFieldSettings } from '../helpers/utils';

class Paddle {
	public ctx;
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private xSpeed: number;
	private ySpeed: number;

	constructor(ctx, paddleSettings, primary = true) {
		const { paddleW, paddleH, yDiff, xDiff } = paddleSettings;
		const { fieldW, fieldH, orientation } = getFieldSettings();

		this.ctx = ctx;
		this.x = xDiff;
		this.y = yDiff;
		this.width = paddleW;
		this.height = paddleH;
		this.xSpeed = 0;
		this.ySpeed = 0;

		if (orientation === 'vertical') {
			this.y = primary ? fieldH - yDiff : yDiff - paddleH;
		} else {
			this.x = primary ? xDiff - paddleW : fieldW - xDiff;
		}

		this.render();
	}

	move() {}

	render() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export default Paddle;
