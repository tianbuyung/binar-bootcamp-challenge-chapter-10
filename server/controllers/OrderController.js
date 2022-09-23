const Sequelize = require("sequelize");
const Model = require("../models");
const { Order, Cart, OrderDetail, Product } = Model;
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config/config.js')[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: {
                UserId: 11,
                // UserId: req.UserId,
                isBought: false
            }
        });

        if (cart) {
            const [order, created] = await Order.findOrCreate({
                where: {
                    CartId: cart.id
                },
                defaults: {
                    totalOrder: req.body.totalOrder
                }
            });

            const result = await sequelize.transaction(async (t) => {
                const [results, metadata] = await sequelize.query(
                    `INSERT INTO "OrderDetails" ("OrderId", "ProductId", "qty", "price", "createdAt", "updatedAt") 
                    SELECT ${order.id}, "ProductId", "qty", "price", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "CartDetails" 
                    JOIN "Products" ON "CartDetails"."ProductId" = "Products"."id" 
                    WHERE "CartId" = ${cart.id}`
                );

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
            where: {
                id: req.params.id
            },
            include: [{
                model: Cart,
                where: {
                    UserId: 11,
                    // UserId: req.UserId,
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
