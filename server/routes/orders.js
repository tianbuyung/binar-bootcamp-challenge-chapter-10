const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const passport = require("passport");

router.post("/", orderController.createOrder);
router.get("/:id", orderController.getOrder);
// router.post("/", passport.authenticate("user-role", { session: false }), orderController.createOrder);
// router.get("/:id", passport.authenticate("user-role", { session: false }), orderController.getOrder);

module.exports = router;
