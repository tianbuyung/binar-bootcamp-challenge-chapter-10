const Model = require("../models");
const { Order, Cart, OrderDetail, Product } = Model;

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                UserId: 11,
                // UserId: req.UserId,
                isBought: false
            },
            include: {
                model: CartDetail,
                include: Product
            }
        });

        if (cart) {
            const result = await sequelize.transaction(async (t) => {
                const order = await Order.create({
                    CartId: cart.id,
                    totalOrder: 0 // hitung
                }, { transaction: t });

                // createOrderDetail

                await Cart.update({
                    isBought: true
                }, {
                    where: {
                        id: cart.id
                    }
                });

                return order;
            });

            res.status(200).json({
                message: "Create Order Success",
                data: result
            });
        } else {
            res.status(400).json({
                message: "Cart empty"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            include: [{
                model: Cart,
                where: {
                    UserId: 11,
                    // UserId: req.UserId,
                    isBought: false
                }
            }, {
                model: OrderDetail,
                include: Product
            }]
        });

        res.status(200).json({
            message: "Get Order Success",
            data: order
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createOrder, getOrder,
};
