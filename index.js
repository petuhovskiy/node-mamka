const express = require('express');
const fs = require('fs');

const app = express();

app.on('/add', (req, res) => {
	//TODO
});

app.use(express.static('static'));

app.listen(80);