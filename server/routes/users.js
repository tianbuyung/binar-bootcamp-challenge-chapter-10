const express = require("express");
const router = express.Router();
const Controller = require("../controllers/UserController");
/* GET users listing. */
router.get("/", UserController.getUserAllUser);

router.get("/:id", UserController.getUser);

router.post("/", UserController.createUser);

module.exports = router;
