const express = require('express');
const app = express(); 



// Middleware

const middlware = (req,res,next) => {
	console.log(`----- Hello middlware -----`);
	next();
}



app.get('/', (req, res) => {
	res.status(200).send('Home Page');
});
app.get('/about',middlware, (req, res) => {
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