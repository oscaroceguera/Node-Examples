import express from 'express';
const app = express();

import api from 'src/server/api';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/tvify');

app.use(express.static('public'));

app.use('/api/votes', (req, res, next) => {
	console.log('Middleware 1');
	next();
});

app.use('/api/votes', (req, res, next) => {
	console.log('Middleware2 ');
	next();
});

app.use('/api', api);

app.listen(3000,() => {
	console.log("servidor iniciado con express en puerto 300");
});
