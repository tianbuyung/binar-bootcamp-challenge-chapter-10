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
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    paranoid: true
  });
  return Product;
};