const { User } = require('../models/userSchema');

const registerUser = (req, res) => {
	const { name, email, phone, work, password, cpassword } = req.body;
	if (!name || !email || !phone || !work || !password || !cpassword) {
		return res.status(422).send({ error: "Missing Credentials" });
	}

	User.findOne({ email })
		.then((userExist) => {
			if (userExist) {
				return res.status(422).send({ error: "User already exists!" });
			}

			const user = new User({ name, email, phone, work, password, cpassword });
			User.create(user).then(() => {
				res.status(201).send({ message: "User registered successfully!" });
			}).catch((err) => res.status(500).send({ error: "User registration failed" }));
		}).catch(err => res.status(500).send({ error: err }));
	
}

module.exports = {
	registerUser
}