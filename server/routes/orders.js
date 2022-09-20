const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrder);

module.exports = router;
