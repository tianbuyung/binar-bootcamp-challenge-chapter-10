const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
/* GET users listing. */
// router.get("/", UserController.getUserAllUser);

router.post("/logout", UserController.logout);

router.post("/", UserController.createUser);

router.post("/login", UserController.login);

module.exports = router;
