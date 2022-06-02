const { Reading_List } = require('../models');

const readingListData = [
  {
    reader_id: 1
  }
];

const seedReadingLists = () => Reading_List.bulkCreate(readingListData);

module.exports = seedReadingLists;
