const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");


router.get("/verify", UserController.verifyJwt);
router.get("/:email", UserController.getUserByEmail);
router.post("/logout", UserController.logout);

router.post("/", UserController.createUser);

router.post("/login", UserController.login);

module.exports = router;
