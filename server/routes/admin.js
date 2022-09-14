const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.get("/products", productController.getProduct);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.editProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get("/products/:id", productController.getDetailProduct);

module.exports = router;
