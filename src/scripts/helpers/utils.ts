const debounce = cb => {
	let timer;
	return event => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(cb, 100, event);
	};
};

const getWindowSize = () => ({
	windowH: window.innerHeight,
	windowW: window.innerWidth,
});

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

export const getFieldSize = () => {
	const { windowH, windowW } = getWindowSize();
	const aspectRatio: number = windowW / windowH;
	let fieldW: number = windowW;
	let fieldH: number = windowH;
	let orientation: string;

	if (aspectRatio > 1) {
		fieldW = windowH * ((1 / 3) * 2);
		orientation = 'vertical';
	} else {
		fieldH = windowW * ((1 / 3) * 2);
		orientation = 'horizontal';
	}

	return { fieldW, fieldH, orientation };
};

export const getPaddleSettings = () => {
	const { fieldH, fieldW } = getFieldSize();

	const paddleSettings = {
		pWidth: 50,
		pHeight: 10,
		yDiff: fieldH * 0.1,
		xDiff: fieldW * 0.5 - 50 / 2,
	};

	return paddleSettings;
};

export const getBallSettings = () => {
	const { fieldH, fieldW } = getFieldSize();

	const ballSettings = {
		size: 5,
		yPos: fieldH * 0.5 - 2.5,
		xPos: fieldW * 0.5 - 5 / 2,
	};

	return ballSettings;
};

export const getFieldSettings = () => {
	const fieldsSize = getFieldSize();

	return { ...fieldsSize };
};
