'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.Category);
      models.Product.hasMany(models.CartDetail, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
      models.Product.hasMany(models.OrderDetail, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};