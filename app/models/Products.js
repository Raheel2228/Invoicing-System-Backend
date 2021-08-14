
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const Products = sequelize.define("products", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
        autoIncrement:true
	},
	name: DataTypes.STRING,
	price: DataTypes.INTEGER
});

module.exports = Products;