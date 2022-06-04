const router = require('express').Router();
const { Book } = require('../../models');

// un-removing authorisation for testing purposes
const withAuth = require('../../utils/auth');

// TODO: Create (share) a book
// posting to 'api/books' (needs auth)
router.post('/', withAuth, async (req, res) => {
  try {
    const loggedInUser = req.session.user_id;

    const { title, author, publication_year, genre } = req.body;

    console.log('\n---REQ.BODY:');
    console.log(req.body);

    const bookData = await Book.create({
      title,
      author,
      publication_year,
      genre_id: genre,
      user_shared_id: loggedInUser
    });

    if (!bookData) {
      res.status(400).json({
        message:
          'Failed to share book. Remember to add title, author and genre.'
      });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    console.log('\n---BOOK ROUTES: POST BOOK ERR');
    console.log(err);
    res.status(400).json(err);
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
