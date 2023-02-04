const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./DB/connect');
const router  = require('./routes/route');



app.use(express.json());

app.use(require('./routes/route'));

// Middleware

const middlware = (req, res, next) => {
	console.log(`----- Hello middlware -----`);
	next();
}


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

module.exports = middlware;