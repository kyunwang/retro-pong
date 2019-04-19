const port = 4000;

const app = require('express')();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

io.on('connection', function(socket) {
	console.log('User connected');

	io.emit('everyone', { msg: 'emitted to everyone' });

	socket.on('private', (from, msg) => {
		console.log(`Private message from ${from} saying: ${msg}`);
		io.emit('test', 'test');
	});

	socket.on('disconnect', () => {
		io.emit('user disconnected');
	});
});

httpServer.listen(port, () => {
	console.log(`Listening to port: ${port}`);
});
