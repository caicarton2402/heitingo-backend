const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  cover_image: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER, defaultValue: 99 },
  commission_rate: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.10 }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Product;
