const { Book_Reading_List } = require('../models');

const bookReadingListData = [
  {
    reading_list_id: 1,
    book_id: 1
  }
];

const seedbookReadingLists = () =>
  Book_Reading_List.bulkCreate(bookReadingListData);

module.exports = seedbookReadingLists;
