const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  nickname: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  role: { type: DataTypes.TINYINT, defaultValue: 0 },
  level: { type: DataTypes.TINYINT, defaultValue: 1 },
  inviter_id: { type: DataTypes.INTEGER },
  grand_inviter_id: { type: DataTypes.INTEGER },
  balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
