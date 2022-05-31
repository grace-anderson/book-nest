const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model { }

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    //Are genres free text or do we provide default values (manage front end using drop down (for e.g.?)
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    //checkout
    check_out: {
      type: DataTypes.BOOLEAN
      // how to set checkout to default of false?
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
        key: 'id',
      },
    },
    //date user shared book
    date_added: {
      type: DataTypes.DATE
      // how to set to default of today?
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Book;