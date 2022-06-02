const { User } = require('../models');

const userData = [
  //1
  {
    username: 'Amanda',
    email: 'anunes@ufc.com',
    password: 'password12345'
  },
  //2
  {
    username: 'Khabib',
    email: 'knurmagomedov@ufc.com',
    password: 'password12345'
  },
  //3
  {
    username: 'Israel',
    email: 'iadesanya@ufc.com',
    password: 'password12345'
  },
  //4
  {
    username: 'Valentina',
    email: 'vshevchenko@ufc.com',
    password: 'password12345'
  },
  //5
  {
    username: 'Tyron',
    email: 'twoodley@ufc.com',
    password: 'password12345'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
