const Model = require("../models");
const { Product, Category } = Model;

const getProduct = async (req, res) => {
  try {
    const query = req.query;
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    const options = {
      order: ["id"],
      limit,
      offset,
      include: [
        {
          model: Category,
          as: "Category",
        },
      ],
    };
    const products = await Product.findAndCountAll(options);
    res.status(200).json({
      message: "Successfully get all products",
      currentPage: page,
      totalPages: Math.ceil(products.count / limit),
      products: products.rows,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const options = {
      where: { id },
      include: [
        {
          model: Category,
          as: "Category",
        },
      ],
    };
    const product = await Product.findOne(options);
    res.status(200).json({
      message: "Successfully get detail a product",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const options = {
      where: {
        name,
        price,
        categoryId,
      },
    };
    let [data, created] = await Product.findOrCreate(options);
    console.log(data, created);
    if (created) {
      res.status(200).json({
        message: "Your product has been created!",
      });
    } else {
      res.status(400).json({
        message: "The name of product is already exist!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const editProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

module.exports = {
  getProduct,
  getDetailProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
