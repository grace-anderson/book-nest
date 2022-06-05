const router = require('express').Router();
const { Reading_List, Book_Reading_List, Book } = require('../../models');
const withAuth = require('../../utils/auth');

// get all book reading lists (for testing purposes)
router.get('/', async (req, res) => {
  try {
    const bookReadingListData = await Book_Reading_List.findAll();

    res.status(200).json(bookReadingListData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// path: /api/reading-list

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

    // convert Sequelize object into plain object
    // readingListData.get({ plain: true });

    // grab the reading list ID out of the plain obj
    const readingListId = readingListData.id;

    // console.log('\n---RL ROUTE: GET READING LIST');
    // console.log(userId, readingListId, bookId);
    // console.log(book);

    // make the attachment to the book-reading-list join table
    await Book_Reading_List.create({
      book_id: bookId,
      reading_list_id: readingListId
    });

    // console.log(bookReadingList);

    // send the book
    res.status(200).json({
      book
    });
  } catch (error) {
    console.log('\n---RL ROUTE: POST TO RL');
    console.log(error);
    res.status(500).json(error);
  }
});

// WHEN A USER REMOVES A BOOK FROM THEIR READING LIST
router.delete('/remove', withAuth, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.session.user_id;

    // first find the correct book-reading-list ID using bookId and userId
    const bookListData = await Book_Reading_List.findOne({
      where: {
        book_id: bookId,
        reading_list_id: userId
      }
    });

    // store the id of the booklist to be removed in a new var
    const bookListToBeRemoved = bookListData.id;

    // console.log('\n---RL ROUTES: DELETE, FIND BOOK READING LIST');
    // console.log(bookListData);
    // console.log(bookListToBeRemoved);

    // remove the booklist column, which removes the book off the user's reading list
    await Book_Reading_List.destroy({
      where: {
        id: bookListToBeRemoved.id
      }
    });

    res.status(200).json({
      bookListToBeRemoved,
      message: 'Successfully removed book from reading list'
    });
  } catch (error) {
    console.log('\n---RL ROUTE: DELETE FROM RL');
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
