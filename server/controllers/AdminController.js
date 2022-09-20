const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const hashPassword = require("../utils/hashPassword");

const loginAdmin = async (req, res) => {
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

	const secret = hashPassword(process.env.KEY);
	const token = jwt.sign(payload, secret);

	let options = {
		maxAge: 1000 * 60 * 60, // would expire after 60 minutes
		httpOnly: true, // The cookie only accessible by the web server
		signed: true, // Indicates if the cookie should be signed
		secure: true, // Indicates if the cookie should be secure
	};

	res.cookie("token", token, options);

	return await res.status(200).send({
		message: "Login successful",
		token: token,
	});
};

const logoutAdmin = async (req, res) => {
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

module.exports = { loginAdmin, logoutAdmin };
