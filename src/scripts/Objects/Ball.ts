class Ball {
	public ctx;
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private xSpeed: number;
	private ySpeed: number;

	constructor(ctx, ballSettings) {
		const { size, yPos, xPos } = ballSettings;

		this.ctx = ctx;
		this.x = xPos;
		this.y = yPos;
		this.width = size;
		this.height = size;
		this.xSpeed = 0;
		this.ySpeed = 0;

		this.render();
	}

	update() {}

	render() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export default Ball;
