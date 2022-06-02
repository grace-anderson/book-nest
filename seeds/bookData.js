const { Book } = require('../models');

const bookData = [
  {
    title: abc,
    author: abc,
    publication_year: 2022,
    check_out: false,
    check_out_expiry: 02 / 08 / 2022,
    user_shared_id: 1,
    date_added: 02 / 06 / 2022,
    genre_id: 1
  }
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
