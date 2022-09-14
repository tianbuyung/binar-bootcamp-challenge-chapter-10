'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.OrderDetail.belongsTo(models.Order);
      models.OrderDetail.belongsTo(models.Product);
    }
  }
  OrderDetail.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    totalOrderDetail: DataTypes.NUMERIC,
    set() {
      this.setDataValue('totalOrderDetail', this.getDataValue('qty') * this.getDataValue('price'));
    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
    indexes: [{ unique: true, fields: ['orderId', 'productId'] }]
  });
  return OrderDetail;
};