const { Genre } = require('../models');

const genreData = [
  //1
  {
    genre_title: 'Comedy'
  },
  //2
  {
    genre_title: 'Fantasy'
  },
  //3
  {
    genre_title: 'Graphic Novels'
  },
  //4
  {
    genre_title: 'High Brow Literature'
  },
  //5
  {
    genre_title: 'Historical'
  },
  //6
  {
    genre_title: 'Horror'
  },
  //7
  {
    genre_title: 'Mystery'
  },
  //8
  {
    genre_title: 'Non Fiction'
  },
  //9
  {
    genre_title: 'Romance'
  },
  //10
  {
    genre_title: 'Sci Fi'
  }
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
