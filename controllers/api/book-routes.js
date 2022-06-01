const router = require('express').Router();
const { Book } = require('../../models');
// const withAuth = require('../../utils/auth');
// const book sharer = require('../../utils/creator');


// Create a book
router.post('/new-book', async (req, res) => {
  try {
    const bookData = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      //user_shared_id: req.session.loggedInId,
      //date_added: default to today
      //check_out: default to False
      //check_out_expiry: no date when book created, date added when book checked out
    });

    if (!bookData.content) {
      alert('Failed to share book.');
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
