var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const hashPassword = require("./utils/hashPassword");
require("./middlewares/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

const oneHour = 1000 * 60 * 60;
app.use(
	session({
		secret: hashPassword("5Ecur1ty Numba W4n!1!"),
		resave: false,
		saveUninitialized: false,
		name: "uniqueSessionID",
		cookie: {
			maxAge: oneHour,
		},
	})
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
