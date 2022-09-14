const getProduct = async (req, res) => {
  let err = null;
  const products = [
    {
      id: 1,
      productName: "Indomie Goreng",
      productPrice: 1300,
      categoryId: 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deletedAt: "",
    },
  ];
  if (err) {
    res.status(400).json({
      message: err,
    });
  } else {
    res.status(200).json({
      message: "Successfully get all produts",
      products,
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
