const { User } = require('../models/userSchema');
const bcrypt = require('bcryptjs');



const getHome = (req, res) => {
	res.status(200).send('Success');
}


// * REGISTERING USER
const registerUser = async (req, res) => {

	try {
		const { name, email, phone, work, password, cpassword } = req.body;
		if (!name || !email || !phone || !work || !password || !cpassword) {
			return res.status(422).send({ error: "Missing Credentials!" });
		}

		const userExist = await User.findOne({ email })
		if (userExist) {
			return res.status(422).send({ error: "User already exists!" });
		} else if (password !== cpassword) {
			return res.status(422).send({ error: "Passwords are not matching!" });
		} else {
			const user = new User({ name, email, phone, work, password, cpassword });

			// pre middleware is being used here before save();
			const userRegistered = await user.save();
			if (userRegistered) {
				res.status(201).send({ message: "User registered successfully!" });
			}
			else {
				res.status(500).send({ error: "User registration failed" });
			}
		}


	} catch (error) {
		res.status(500).send({ error });
	}

	// USING PROMISE

	// const { name, email, phone, work, password, cpassword } = req.body;
	// if (!name || !email || !phone || !work || !password || !cpassword) {
	// 	return res.status(422).send({ error: "Missing Credentials" });
	// }

	// User.findOne({ email })
	// 	.then((userExist) => {
	// 		if (userExist) {
	// 			return res.status(422).send({ error: "User already exists!" });
	// 		}

	// 		const user = new User({ name, email, phone, work, password, cpassword });
	// 		User.create(user).then(() => {
	// 			res.status(201).send({ message: "User registered successfully!" });
	// 		}).catch((err) => res.status(500).send({ error: "User registration failed" }));
	// 	}).catch(err => res.status(500).send({ error: err }));

}



// * LOGING IN USER
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send({ error: "Missing Credentials!" });
		}

		const userExist = await User.findOne({ email });
		if (userExist) {
			const passwordMatch = await bcrypt.compare(password, userExist.password);
			if (!passwordMatch) {
				res.status(200).send({ message: "Invalid Credentials" });
			}
			else {
				res.status(400).send({ message: "user logged in successfully! " });
			}
		}
		else {
			res.status(400).send({ error: "User does not exist!" });
		}

	} catch (error) {
		res.status(500).send({ error });
	}
}





module.exports = {
	registerUser, loginUser, getHome
}