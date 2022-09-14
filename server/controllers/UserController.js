const Model = require("../models");
const { User } = Model;

const getUser = (req, res) => {};

const createUser = (req, res) => {
	const { username, password, email } = req.body;
	console.log("cek data masuk : ", username, password, email);

	User.create({
		username: username,
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
