import { addCanvasResize } from './utils/events';
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.append(canvas);

addCanvasResize(canvas);
