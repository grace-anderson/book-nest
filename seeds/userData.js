const { User } = require('../models');

const userData = [
  {
    username: 'Amanda',
    email: 'anunes@ufc.com',
    password: 'password12345'
  },
  {
    username: 'Khabib',
    email: 'knurmagomedov@ufc.com',
    password: 'password12345'
  },
  {
    username: 'Israel',
    email: 'iadesanya@ufc.com',
    password: 'password12345'
  },
  {
    username: 'Valentina',
    email: 'vshevchenko@ufc.com',
    password: 'password12345'
  },
  {
    username: 'Tyron',
    email: 'twoodley@ufc.com',
    password: 'password12345'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
