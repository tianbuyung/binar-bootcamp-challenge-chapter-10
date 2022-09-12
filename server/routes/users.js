var express = require("express");
var router = express.Router();
const Controller = require("../controllers/UserController");
/* GET users listing. */
router.get("/", Controller.getUserAllUser);

router.get("/:id", Controller.getUser);

module.exports = router;
