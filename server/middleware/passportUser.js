const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
const Model = require("../models");
const hashPassword = require("../utils/hashPassword");
const { User } = Model;

const cookieExtractor = (req) => {
	let jwt = null;

	if (req && req.cookies) {
		jwt = req.signed.cookies["token"];
	}

	return jwt;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = hashPassword(process.env.KEY);

passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		return User.findOne({ where: { email: jwt_payload.id } })
			.then((user) => {
				return done(null, user);
			})
			.catch((err) => {
				return done(err, false);
			});
	})
);
