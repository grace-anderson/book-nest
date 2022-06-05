const { User } = require('../models');

const userData = [
  //1
  {
    username: 'Sally C',
    email: 'sally@email.com',
    password: 'abc123'
  },
  //2
  {
    username: 'Alicia Tumbi',
    email: 'alicia@email.com',
    password: 'abc123'
  },
  //3
  {
    username: 'Gertrude the Great',
    email: 'gertrude@email.com',
    password: 'abc123'
  },
  //4
  {
    username: 'Bobby the Spider',
    email: 'bobby@email.com',
    password: 'abc123'
  },
  //5
  {
    username: 'Leonardo Turtle',
    email: 'leonardo@email.com',
    password: 'abc123'
  }
];

// to make sure the hashed passwords carry over
const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });
};

module.exports = seedUsers;
