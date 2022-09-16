const { User } = require("../models");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/hashPassword");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const cekUser = await User.findOne({ email: email });

		if (!cekUser) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		const cekPass = bcrypt.compare(cekUser.password, password);

		if (!cekPass) {
			return res.status(401).json({
				message: "Passwords do not match",
			});
		}

		const payload = {
			id: cekUser.email,
		};

		const secret = hashPassword("v3ry 53cr3t!1!");
		const token = jwt.sign(payload, secret, { expiresIn: "1 days" });

		return res.status(200).json({
			message: "Login successful",
		});
	} catch (error) {
		return res.status(500).json({
			message: "error while authenticating user = " + error.message,
		});
	}
};

const createUser = async (req, res) => {
	try {
		const { nama, password, email } = req.body;

		const cekEmail = await User.findOne({ email: email });

		if (cekEmail) {
			return res.status(409).json({
				message: "Email already exist, Please use another email address",
			});
		}

		await User.create({
			name: nama,
			password: password,
			email: email,
		});

		return res.status(200).json({
			message: "Successfully create user",
		});
	} catch (error) {
		res.status(500).json({
			message: "error creating user : " + error.message,
		});
	}
};

const getUserAllUser = (req, res) => {
	res.json({
		message: "Get User",
	});
};

module.exports = { login, getUserAllUser, createUser };
