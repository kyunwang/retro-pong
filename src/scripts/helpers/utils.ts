const debounce = cb => {
	let timer;
	return event => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(cb, 100, event);
	};
};

export const requestAnimationFrame =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60); // 60fps per seconds
	};

export const addCanvasResize = (canvas: HTMLCanvasElement, ctx) => {
	window.addEventListener(
		'resize',
		debounce(() => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			canvas.width = width;
			canvas.height = height;
			canvas.fillStyle = '#ff00ff';

			ctx.fillRect(0, 0, width, height);
		})
	);
};
