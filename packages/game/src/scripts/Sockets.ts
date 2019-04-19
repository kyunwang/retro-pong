import io from 'socket.io-client';

const initSocket = ({ url, config = {} }) => {
	const socket = io(url, config);

	socket.on('connect', () => console.log('Connected'));
	socket.on('disconnet', () => console.log('Disconnected'));

	socket.on('everyone', msg => {
		console.log(msg);
		socket.emit('private', 'person', 'message');
	});

	socket.on('test', msg => console.log(msg));
};

function subscribeTo(socket, callback) {
	socket.on('event', data => callback(data));
}

export { initSocket };
