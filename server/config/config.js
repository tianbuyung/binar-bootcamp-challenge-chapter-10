require("dotenv").config();
// console.log("cek env : ", process.env);
module.exports = {
	development: {
		username: process.env.DB_USERNAME_DEV || "postgres",
		password: "danieltan" || process.env.DB_PASSWORD_DEV,
		database: process.env.DB_DEV || "c9-dev",
		host: "127.0.0.1",
		dialect: "postgres",
	},
	test: {
		username: process.env.DB_USERNAME_TEST,
		password: process.env.DB_PASSWORD_TEST,
		database: process.env.DB_TEST,
		host: "127.0.0.1",
		dialect: "postgres",
	},
	production: {
		username: process.env.DB_USERNAME_PROD,
		password: process.env.DB_PASSWORD_PROD,
		database: process.env.DB_PROD,
		host: "127.0.0.1",
		dialect: "postgres",
	},
};
