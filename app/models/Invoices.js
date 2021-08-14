
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Invoice = sequelize.define("invoice", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	customer_name: DataTypes.STRING,
	customer_phone: DataTypes.STRING,
	customer_address: DataTypes.STRING,
	customer_email: DataTypes.STRING,
	pin: DataTypes.INTEGER,
	tax: DataTypes.INTEGER,
	discount: DataTypes.INTEGER,
	total_amount: DataTypes.INTEGER
});

module.exports = Invoice;