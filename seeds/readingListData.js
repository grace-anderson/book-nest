const { Reading_List } = require('../models');

const readingListData = [
  {
    reader_id: 1
  },
  {
    reader_id: 2
  },
  {
    reader_id: 3
  },
  {
    reader_id: 4
  },
  {
    reader_id: 5
  }
];

const seedReadingLists = () => Reading_List.bulkCreate(readingListData);

module.exports = seedReadingLists;
