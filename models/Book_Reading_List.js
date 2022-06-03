const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book_Reading_List extends Model {}

Book_Reading_List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reading_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reading_list',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'book',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book_reading_list'
  }
);

module.exports = Book_Reading_List;
