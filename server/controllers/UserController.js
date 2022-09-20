const { User } = require("../models");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const cekUser = await User.findOne({
			where: {
				email: email,
			},
		});

		if (!cekUser) {
			return res.status(401).json({
				message: "Wrong email or password",
			});
		}

		const cekPass = await bcrypt.compare(password, cekUser.password);

		if (!cekPass) {
			return res.status(401).json({
				message: "Wrong email or password",
			});
		}

		const payload = {
			id: cekUser.email,
		};

		const secret = hashPassword(process.env.KEY);
		const token = jwt.sign(payload, secret);

		let options = {
			maxAge: 1000 * 60 * 60, // would expire after 60 minutes
		};

		res.cookie("token", token, options);

		return await res.status(200).json({
			message: "Login successful",
			token: token,
		});
	} catch (error) {
		return await res.status(500).json({
			message: "error while authenticating user " + error.message,
		});
	}
};

const logout = async (req, res) => {
	try {
		res.clearCookies("token");

		return await res.status(200).send({
			message: "Successfully logged out",
		});
	} catch (error) {
		return await res.status(500).json({
			message: "error while logout",
		});
	}
};

const createUser = async (req, res) => {
	try {
		const { nama, password, email } = req.body;

		const cekEmail = await User.findOne({
			where: {
				email: email,
			},
		});

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
			message: "error creating user",
		});
	}
};

const getUserAllUser = (req, res) => {
	res.json({
		message: "Get User",
	});
};

module.exports = { login, getUserAllUser, createUser, logout };
