const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get(
  "/",
  passport.authenticate("user-role", { session: false }),
  UserController.getUserById
);

router.get("/verify", UserController.verifyJwt);

router.post("/logout", UserController.logout);

router.post("/", UserController.createUser);

router.post("/login", UserController.login);

module.exports = router;
