const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// path: /api/books

// SHARING (CREATING) A BOOK
router.post('/', withAuth, async (req, res) => {
  try {
    // grab session user's id
    const loggedInUser = req.session.user_id;

    // grab the request body thru deconstructed obj
    const { title, author, publicationYear, genreValue, synopsis } = req.body;

    // create the book using the req.body values
    const bookData = await Book.create({
      title,
      author,
      publication_year: publicationYear,
      genre_id: genreValue,
      synopsis,
      user_shared_id: loggedInUser
    });

    // if successful, send data of the new book
    res.status(200).json(bookData);
  } catch (error) {
    // error handling
    console.log('\n---BOOK ROUTES: POST BOOK ERR');
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
