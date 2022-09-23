const express = require("express");
const router = express.Router();
const cartDetailController = require("../controllers/CartDetailController");

router.post("/", cartDetailController.createCartDetail);
router.delete("/:id", cartDetailController.deleteCartDetail);

module.exports = router;
