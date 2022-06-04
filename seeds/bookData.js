const { Book } = require('../models');
//TODO: add fields to Book model and to seeds
// - date_added

const bookData = [
  {
    title: 'Harry Potter - The Complete Collection',
    author: 'JK Rowling',
    publication_year: 2014,
    user_shared_id: 5,
    genre_id: 2
  },
  {
    title: 'To Paradise',
    author: 'Hanya Yanagihara',
    publication_year: 2022,
    user_shared_id: 4,
    genre_id: 4
  },
  {
    title: 'Watchmen',
    author: 'Alan Moore',
    publication_year: 1986,
    user_shared_id: 3,
    genre_id: 3
  },
  {
    title: 'The Decline and Fall of the Roman Empire',
    author: 'Edward Gibbon',
    publication_year: 1789,
    user_shared_id: 2,
    genre_id: 8
  },
  {
    title: '488 Rules for Life',
    author: 'Kitty Flanagan',
    publication_year: 2019,
    user_shared_id: 1,
    genre_id: 1
  }
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
