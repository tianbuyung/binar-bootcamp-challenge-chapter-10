const { User } = require("../models");

const getUser = (req, res) => {};

const createUser = (req, res) => {
	const { username, password, email } = req.body;
	console.log(
		"🚀 ~ file: UserController.js ~ line 7 ~ createUser ~ username, password, email",
		username,
		password,
		email
	);

	User.create({
		name: username,
		password: password,
		email: email,
	})
		.then(() => {
			res.status(200).json({
				message: "Successfully create user",
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "error creating user : " + err.message,
			});
		});
};

const getUserAllUser = (req, res) => {
	res.json({
		message: "Get User",
	});
};

module.exports = { getUser, getUserAllUser, createUser };
