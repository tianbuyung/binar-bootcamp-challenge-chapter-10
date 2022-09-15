var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
/* GET users listing. */
router.get("/", UserController.getUserAllUser);

router.get("/:id", UserController.getUser);

router.post("/", UserController.createUser);

module.exports = router;
