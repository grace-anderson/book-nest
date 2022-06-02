const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    //checkout
    check_out: {
      type: DataTypes.BOOLEAN
      // defaultValue: 0
    },
    check_out_expiry: {
      type: DataTypes.DATE
      // how to set to 14 days from checkout (for eg)?
    },
    //user that shared the book
    user_shared_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    //date user shared book
    date_added: {
      type: DataTypes.DATE
      // how to set to default of today?
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'genre',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
  }
);

module.exports = Book;
