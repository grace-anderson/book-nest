const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// path: /api/books

// SHARING (CREATING) A BOOK
router.post('/', withAuth, async (req, res) => {
  try {
    const loggedInUser = req.session.user_id;

    const { title, author, publicationYear, genreValue, synopsis } = req.body;

    // console.log('\n---REQ.BODY:');
    // console.log(req.body);

    const bookData = await Book.create({
      title,
      author,
      publication_year: publicationYear,
      genre_id: genreValue,
      synopsis,
      user_shared_id: loggedInUser
    });

    // console.log('\n---BOOK ROUTES: POST BOOK');
    // console.log(bookData);

    res.status(200).json(bookData);
  } catch (error) {
    console.log('\n---BOOK ROUTES: POST BOOK ERR');
    console.log(error);
    res.status(400).json(error);
  }
});

/*


// TODO: Update book
router.put('/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.update(
      {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: Delete a book
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});


*/

module.exports = router;
