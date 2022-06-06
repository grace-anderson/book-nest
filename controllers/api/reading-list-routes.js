const router = require('express').Router();
const { Reading_List, Book_Reading_List, Book } = require('../../models');
const withAuth = require('../../utils/auth');

// path: /api/reading-list

// get all book reading lists (for testing purposes)
router.get('/', async (req, res) => {
  try {
    // get all book reading list data
    const bookReadingListData = await Book_Reading_List.findAll();

    res.status(200).json(bookReadingListData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// WHEN USER ADDS A BOOK TO THEIR READING LIST
router.post('/add', withAuth, async (req, res) => {
  try {
    // bookId comes from front end
    const { bookId } = req.body;

    // get the book details out of db
    const bookData = await Book.findByPk(bookId);
    const book = bookData.get({ plain: true });

    // get user id from the user in session
    const userId = req.session.user_id;

    // get the user's reading list as a Sequelize object
    const readingListData = await Reading_List.findByPk(userId, {
      where: {
        reader_id: userId
      }
    });

    // grab the reading list ID out of the returned data
    const readingListId = readingListData.id;

    // first see if the book exists on the user's reading list
    const isBookOnReadingList = await Book_Reading_List.findOne({
      where: {
        book_id: bookId,
        reading_list_id: readingListId
      }
    });

    // if a bookList does NOT exist (ie. a book is NOT on a user's reading list), then go ahead and create a new match
    if (!isBookOnReadingList) {
      await Book_Reading_List.create({
        book_id: bookId,
        reading_list_id: readingListId
      });

      // send details of the book that is to be added to the reading list
      res.status(200).json({
        book
      });
    } else {
      res.status(400).json({
        message: 'Book has already been added to reading list'
      });
    }

    // make the attachment to the book-reading-list join table
  } catch (error) {
    console.log('\n---RL ROUTE: POST TO RL ERR');
    console.log(error);
    res.status(500).json(error);
  }
});

// WHEN A USER REMOVES A BOOK FROM THEIR READING LIST
router.delete('/remove', withAuth, async (req, res) => {
  try {
    // grab ids
    const { bookId } = req.body;
    const userId = req.session.user_id;

    // first see if the book is already on the user's reading list
    const isBookOnReadingList = await Book_Reading_List.findOne({
      where: {
        book_id: bookId,
        reading_list_id: userId
      }
    });

    // console.log('\n---RL DELETE: IS BOOK ON READING LIST');
    // console.log(isBookOnReadingList);

    // if the book IS on the user's reading list:
    if (isBookOnReadingList) {
      // grab the id of the booklist that we want to destroy
      const bookToBeRemoved = isBookOnReadingList.id;

      // destroy the link between book and reading list
      await Book_Reading_List.destroy({
        where: {
          id: bookToBeRemoved
        }
      });

      // send the data of the destroyed book and reading list link, and also a back-end message that it was successful
      res.status(200).json({
        bookToBeRemoved,
        message: 'Successfully removed book from reading list'
      });
    } else {
      res.status(400).json({
        message: 'Book was never added to the reading list'
      });
    }
  } catch (error) {
    console.log('\n---RL ROUTE: DELETE FROM RL ERR');
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
