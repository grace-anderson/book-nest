const { Genre } = require('../models');

const genreData = [
  {
    genre_title: Fantasy
  }
];

const seedGenres = () => Genre.bulkCreate(genreData);

module.exports = seedGenres;
