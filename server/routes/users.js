const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
/* GET users listing. */
router.get("/", UserController.getUserAllUser);

router.get("/:email", UserController.getUserByEmail);

router.post("/", UserController.createUser);

module.exports = router;
