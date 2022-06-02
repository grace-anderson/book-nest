const { Book_Reading_List } = require('../models');

const bookReadingListData = [
  {
    reading_list_id: 1,
    book_id: 1
  },
  {
    reading_list_id: 1,
    book_id: 3
  },
  {
    reading_list_id: 1,
    book_id: 5
  },
  {
    reading_list_id: 2,
    book_id: 4
  },
  {
    reading_list_id: 3,
    book_id: 2
  },
  {
    reading_list_id: 4,
    book_id: 2
  },
  {
    reading_list_id: 4,
    book_id: 4
  },
  {
    reading_list_id: 5,
    book_id: 1
  },
  {
    reading_list_id: 5,
    book_id: 2
  },
  {
    reading_list_id: 5,
    book_id: 3
  },
  {
    reading_list_id: 5,
    book_id: 4
  },
  {
    reading_list_id: 5,
    book_id: 5
  }
];

const seedbookReadingLists = () =>
  Book_Reading_List.bulkCreate(bookReadingListData);

module.exports = seedbookReadingLists;
