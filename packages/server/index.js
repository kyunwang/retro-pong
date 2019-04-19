const express = require('express');
const app = express();

const port = 4000;

app.get('/', (req, res) => {
	res.send('TEST');
});

app.listen(port, console.log(`Listening to port: ${port}`));
