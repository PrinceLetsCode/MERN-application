const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./DB/connect');





// Middleware

const middlware = (req, res, next) => {
	console.log(`----- Hello middlware -----`);
	next();
}


app.get('/', (req, res) => {
	res.status(200).send('Home Page');
});
app.get('/about', middlware, (req, res) => {
	res.status(200).send('About Page');
});
app.get('/contact', (req, res) => {
	res.status(200).send('Contact Page');
});
app.get('/signin', (req, res) => {
	res.status(200).send('Signin Page');
});
app.get('/signup', (req, res) => {
	res.status(200).send('signup Page');
});

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(`----- Server running on PORT : ${process.env.PORT} -----`);
		})
	} catch (error) {
		console.log(error);
	}
}

start();