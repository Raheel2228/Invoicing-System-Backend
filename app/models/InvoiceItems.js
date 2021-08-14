
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const InvoiceItems = sequelize.define("invoiceItems", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	invoiceId: DataTypes.INTEGER,
	productId: DataTypes.INTEGER,
	quantity: DataTypes.INTEGER
});

module.exports = InvoiceItems;