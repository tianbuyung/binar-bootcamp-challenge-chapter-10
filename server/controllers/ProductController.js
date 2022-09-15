const Model = require("../models");
const { Product } = Model;

const getProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      message: "Successfully get all products",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const getDetailProduct = async (req, res) => {};

const createProduct = async (req, res) => {};

const editProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

module.exports = {
  getProduct,
  getDetailProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
