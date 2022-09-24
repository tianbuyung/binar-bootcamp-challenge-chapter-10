const Model = require("../models");
const { Category, Product } = Model;

const getCategories = async (req, res) => {
  try {
    const options = {
      include: [
        {
          model: Product,
        },
      ],
    };
    const categories = await Category.findAll(options);
    res.status(200).json({
      message: "Successfully get all categories",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,
};
