const Model = require("../models");
const { Category } = Model;

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      message: "Successfully get all categories",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  getCategories,
};
