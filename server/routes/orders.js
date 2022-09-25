const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const passport = require("passport");

router.post("/", orderController.createOrder);
router.get("/:id", orderController.getOrder);

module.exports = router;
