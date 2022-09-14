const express = require("express");
const router = express.Router();
const Controller = require("../controllers/UserController");
/* GET users listing. */
router.get("/", Controller.getUserAllUser);

router.get("/:id", Controller.getUser);

module.exports = router;
