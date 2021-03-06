const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reading_List extends Model {}

Reading_List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reader_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'reading_list'
  }
);

module.exports = Reading_List;
