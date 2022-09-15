const { User } = require("../models");

const getUser = (req, res) => {};

const createUser = (req, res) => {
	const { nama, password, email } = req.body;

	// User.findOne()
	User.create({
		name: nama,
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
				message: "error creating user : " + err,
			});
		});
};

const getUserAllUser = (req, res) => {
	res.json({
		message: "Get User",
	});
};

module.exports = { getUser, getUserAllUser, createUser };
