const debounce = cb => {
	let timer;
	return event => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(cb, 100, event);
	};
};

export const addCanvasResize = (canvas: HTMLCanvasElement) => {
	window.addEventListener(
		'resize',
		debounce(() => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		})
	);
};
