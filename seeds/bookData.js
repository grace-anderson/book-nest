const { Book } = require('../models');
//fields not added in seeds
//- check_out_expiry
// -date_added

const bookData = [
  {
    title: 'Harry Potter - The Complete Collection',
    author: 'J.k.Rowling',
    publication_year: 2014,
    check_out: false,
    user_shared_id: 5,
    genre_id: 1
  },
  {
    title: 'To Paradise',
    author: 'Hanya Yanagihara',
    publication_year: 2022,
    check_out: false,
    user_shared_id: 4,
    genre_id: 4
  },
  {
    title: 'Watchmen',
    author: 'Alan Moore',
    publication_year: 1986,
    check_out: false,
    user_shared_id: 3,
    genre_id: 3
  },
  {
    title: 'The Decline and Fall of the Roman Empire',
    author: 'Edward Gibbon',
    publication_year: 1789,
    check_out: false,
    user_shared_id: 2,
    genre_id: 8
  },
  {
    title: '488 Rules for Life',
    author: 'Kitty Flanagan',
    publication_year: 2019,
    check_out: false,
    user_shared_id: 1,
    genre_id: 1
  }
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
