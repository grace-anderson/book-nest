const { User } = require('../models');

const userData = [
  //1
  {
    username: 'Sally',
    email: 'sally@email.com',
    password: 'abc123'
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

// to make sure the hashed passwords carry over
const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });
};

module.exports = seedUsers;
