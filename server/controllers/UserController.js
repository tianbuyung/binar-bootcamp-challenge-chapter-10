const { User } = require("../models");

const getUser = (req, res) => {};

const createUser = async (req, res) => {
	const { nama, password, email } = req.body;

	const cekEmail = await User.findOne({ email: email });

	if (cekEmail) {
		return res.status(409).json({
			message: "Email already exist, Please use another email address",
		});
	}

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
