class Paddle {
	public ctx;
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private xSpeed: number;
	private ySpeed: number;

	constructor(ctx, x: number, y: number, width: number, height: number) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.xSpeed = 0;
		this.ySpeed = 0;

		this.render();
	}

	move() {}

	render() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export default Paddle;
