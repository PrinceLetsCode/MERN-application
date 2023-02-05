const express = require('express');
const router = express.Router();
const middleware = require('../app');
const { registerUser,loginUser,getHome } = require('../controllers/controllers');

router.route('/').get(getHome);

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);















// router.get('/about', middleware, (req, res) => {
// 	res.status(200).send('About Page');
// });
// router.get('/contact', (req, res) => {
// 	res.status(200).send('Contact Page');
// });
// router.get('/signin', (req, res) => {
// 	res.status(200).send('Signin Page');
// });
// router.get('/signup', (req, res) => {
// 	res.status(200).send('signup Page');
// });

module.exports = router;