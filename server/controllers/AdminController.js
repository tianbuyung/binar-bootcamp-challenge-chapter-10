const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
	try {
		const { email, password } = req.body;

		const cekUser = await Admin.findOne({ where: { email: email } });

		if (!cekUser) {
			return res.status(401).send({
				message: "Wrong email or password",
			});
		}

		const cekPassword = bcrypt.compare(password, cekUser.password);

		if (!cekPassword) {
			return res.status(401).send({
				message: "Wrong email or password",
			});
		}

		const payload = {
			id: cekUser.email,
		};

		const secret = process.env.KEY;
		const token = jwt.sign(payload, secret, { expiresIn: "1 hour" });

		let options = {
			maxAge: 1000 * 60 * 60, // would expire after 60 minutes
			httpOnly: true, // The cookie only accessible by the web server
			signed: true, // Indicates if the cookie should be signed
			secure: true, // Indicates if the cookie should be secure
			samesite: "none",
		};

		res.cookie("tokenAdmin", token, options);

		return await res.status(200).send({
			message: "Login successful",
			token: token,
		});
	} catch (err) {
		return await res.status(500).json({
			message: "error while authenticating user " + err.message,
		});
	}
};

const verifyJwt = (req, res) => {
	const token = req.signedCookies.tokenAdmin;
	jwt.verify(token, process.env.KEY, (err, result) => {
		if (err) {
			res.status(403).json({
				message: "unauthorized",
			});
		} else {
			res.status(200).json({
				message: "authorized",
			});
		}
	});
};

const logoutAdmin = async (req, res) => {
	try {
		res.cookie("tokenAdmin", "");

		return await res.status(200).send({
			message: "Successfully logged out",
		});
	} catch (error) {
		return await res.status(500).json({
			message: "error while logout",
		});
	}
};

module.exports = { loginAdmin, logoutAdmin, verifyJwt };
