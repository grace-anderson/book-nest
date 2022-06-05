const router = require('express').Router();
const { Reading_List, Book_Reading_List, Book } = require('../../models');

// path: /api/reading-list

// post to the reading list of the user
router.post('/add', async (req, res) => {
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
    readingListData.get({ plain: true });

    // grab the reading list ID out of the plain obj
    const readingListId = readingListData.id;

    console.log('\n---RL ROUTE: GET READING LIST');
    console.log(userId, readingListId, bookId);
    console.log(book);

    // make the attachment?
    const bookReadingList = await Book_Reading_List.create({
      book_id: bookId,
      reading_list_id: readingListId
    });

    console.log(bookReadingList);

    // send the book?
    res.status(200).json({
      book
    });
  } catch (error) {
    console.log('\n---RL ROUTE: POST TO RL');
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
