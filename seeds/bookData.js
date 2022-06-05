const { Book } = require('../models');
//TODO: add fields to Book model and to seeds
// - date_added

const bookData = [
  {
    title: '488 Rules for Life',
    author: 'Kitty Flanagan',
    publication_year: 2019,
    user_shared_id: 1,
    genre_id: 1
  },
  {
    title: 'Harry Potter - The Complete Collection',
    author: 'JK Rowling',
    publication_year: 2014,
    user_shared_id: 5,
    genre_id: 2
  },
  {
    title: 'Watchmen',
    author: 'Alan Moore',
    publication_year: 1986,
    user_shared_id: 4,
    genre_id: 3
  },
  {
    title: 'To Paradise',
    author: 'Hanya Yanagihara',
    publication_year: 2022,
    user_shared_id: 3,
    genre_id: 4
  },

  {
    title: 'A Gentleman in Moscow',
    author: 'Amor Towles',
    publication_year: 2018,
    user_shared_id: 2,
    genre_id: 5
  },
  {
    title: 'It',
    author: 'Stephen King',
    publication_year: 1986,
    user_shared_id: 5,
    genre_id: 6
  },
  {
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    publication_year: 1939,
    user_shared_id: 3,
    genre_id: 7
  },
  {
    title: 'The Decline and Fall of the Roman Empire',
    author: 'Edward Gibbon',
    publication_year: 1789,
    user_shared_id: 2,
    genre_id: 8
  },
  {
    title: 'Rough and Ready',
    author: 'Sandra Hill',
    publication_year: 2006,
    user_shared_id: 4,
    genre_id: 9
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    publication_year: 1965,
    user_shared_id: 1,
    genre_id: 10
  }
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
