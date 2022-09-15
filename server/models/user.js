"use strict";

const hashPassword = require("../utils/hashPassword");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.User.hasMany(models.Cart, {
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			});
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlpha: true,
					notNull: true,
					notEmpty: true,
					len: [3, 255],
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
					notNull: true,
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				// validate: {
				// 	isAlphanumeric: true,
				// 	notNull: true,
				// 	notEmpty: true,
				// 	len: [6, 60],
				// },
				async set(value) {
					const hashpass = await hashPassword(value);
					console.log(
						"🚀 ~ file: user.js ~ line 54 ~ set ~ hashpass",
						hashpass
					);
					this.setDataValue("password", await hashpass);
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			paranoid: true,
		}
	);
	return User;
};
