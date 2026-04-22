const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Celebrity = sequelize.define('Celebrity', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  real_name: { type: DataTypes.STRING },
  height: { type: DataTypes.INTEGER },
  weight: { type: DataTypes.INTEGER },
  social_stats: { type: DataTypes.JSON },
  external_links: { type: DataTypes.JSON },
  rank_stars: { type: DataTypes.TINYINT, defaultValue: 5 }
}, {
  tableName: 'celebrities',
  timestamps: false
});

module.exports = Celebrity;
