const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedBooks = require('./bookData');
const seedGenres = require('./genreData');
const seedReadingLists = require('./readingListData');
const seedBookReadingLists = require('./bookReadingListData');

//load test seed data
const seedAll = async () => {
  await sequelize.sync({ force: true });

  // seeding must be done in this order
  await seedUsers();

  await seedGenres();

  await seedBooks();

  await seedReadingLists();

  await seedBookReadingLists();

  process.exit(0);
};

seedAll();
