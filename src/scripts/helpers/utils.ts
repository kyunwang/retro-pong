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

export const addCanvasResize = (
	canvas: HTMLCanvasElement,
	ctx,
	cb = () => {}
) => {
	window.addEventListener(
		'resize',
		debounce(() => {
			const { fieldH, fieldW, orientation } = getFieldSize();
			const width = window.innerWidth;
			const height = window.innerHeight;

			canvas.width = fieldW * 2;
			canvas.height = fieldH * 2;
			canvas.style.width = `${canvas.width / 2}px`;
			canvas.style.height = `${canvas.height / 2}px`;

			canvas.fillStyle = '#ff00ff';
			ctx.fillRect(0, 0, width, height);

			cb(); // Should update positions in case orientation has changed
		})
	);
};

export const getFieldSize = () => {
	const { windowH, windowW } = getWindowSize();
	const aspectRatio: number = windowW / windowH;
	let fieldW: number = windowW * 2;
	let fieldH: number = windowH * 2;
	let orientation: string;

	if (aspectRatio > 1) {
		fieldW = windowH * (2 / 3) * 2;
		orientation = 'vertical';
	} else {
		fieldH = windowW * (2 / 3) * 2;
		orientation = 'horizontal';
	}

	return { fieldW, fieldH, orientation };
};

export const getPaddleSettings = () => {
	const { fieldH, fieldW, orientation } = getFieldSize();

	if (orientation === 'vertical') {
		return {
			paddleW: 50,
			paddleH: 10,
			yDiff: fieldH * 0.1,
			xDiff: fieldW * 0.5 - 50 / 2,
		};
	}

	return {
		paddleW: 10,
		paddleH: 50,
		yDiff: fieldH * 0.5 - 50 / 2,
		xDiff: fieldW * 0.1,
	};
};

export const getBallSettings = () => {
	const { fieldH, fieldW } = getFieldSize();

	const ballSettings = {
		size: 10,
		yPos: fieldH * 0.5 - 5,
		xPos: fieldW * 0.5 - 5,
	};

	return ballSettings;
};

export const getFieldSettings = () => {
	const fieldsSize = getFieldSize();

	return { ...fieldsSize };
};
