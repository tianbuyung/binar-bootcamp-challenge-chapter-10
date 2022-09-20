const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const adminController = require("../controllers/AdminController");

router.get("/products", productController.getProduct);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.editProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get("/products/:id", productController.getDetailProduct);
router.post("/", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);

module.exports = router;
