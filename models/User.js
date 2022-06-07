const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // custom validator for unique usernames
        // https://stackoverflow.com/questions/16356856/sequelize-js-custom-validator-check-for-unique-username-password
        isUnique: (value, next) => {
          User.findAll({
            where: { username: value },
            attributes: ['id']
          })
            .then((user) => {
              if (user.length !== 0) {
                next(new Error('Username is already in use'));
              }
              next();
            })
            .catch((onError) => console.log(onError));
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format.'
        },
        // custom validator for unique emails (reference link above)
        isUnique: (value, next) => {
          User.findAll({
            where: { email: value },
            attributes: ['id']
          })
            .then((user) => {
              if (user.length !== 0) {
                next(new Error('Email address is already in use'));
              }
              next();
            })
            .catch((onError) => console.log(onError));
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
