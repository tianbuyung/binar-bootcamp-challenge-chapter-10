const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
const Model = require("../models");
const hashPassword = require("../utils/hashPassword");
const { userGame } = Model;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = hashPassword("v3ry 53cr3t!1!");

passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		return userGame
			.findOne({ where: { email: jwt_payload.id } })
			.then((user) => {
				return done(null, user);
			})
			.catch((err) => {
				console.log("error passport: " + err);
				return done(err, false);
			});
	})
);
