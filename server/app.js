const express = require('express');
const app = express();
const mongoose = require('mongoose');

const DB = 'mongodb+srv://PrinceKumar:KhannaKriti@cluster2.rugv53e.mongodb.net/USER_DATABASE?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
mongoose.connect(DB)
	.then((res) => {
	console.log('connected to DB');
	})
	.catch((err) => console.log(err));

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

app.listen(5000, () => {
	console.log(`----- Server running on PORT : 5000 -----`);
})