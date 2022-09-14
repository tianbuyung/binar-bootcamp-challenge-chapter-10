'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cart.belongsTo(models.User);
      models.Cart.hasMany(models.CartDetail, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      models.Cart.hasOne(models.Order, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }
  Cart.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isBought: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};