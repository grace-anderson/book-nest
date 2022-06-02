const { Genre } = require('../models');

const genreData = [
  {
    genre_title: 'Comedy'
  },
  {
    genre_title: 'Fantasy'
  },
  {
    genre_title: 'Graphic Novels'
  },
  {
    genre_title: 'High Brow Literature'
  },
  {
    genre_title: 'Historical'
  },
  {
    genre_title: 'Horror'
  },
  {
    genre_title: 'Mystery'
  },
  {
    genre_title: 'Romance'
  },
  {
    genre_title: 'Sci Fi'
  }
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
