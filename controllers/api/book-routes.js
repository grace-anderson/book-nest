const router = require('express').Router();
const { Book } = require('../../models');

// removing authorisation for testing purposes
// const withAuth = require('../../utils/auth');

// TODO: Create a book
// posting to 'api/books' (needs auth)
router.post('/', async (req, res) => {
  try {
    const { title, author, publication_year, genre_id, user_shared_id } =
      req.body;

    const bookData = await Book.create({
      title,
      author,
      publication_year,
      genre_id,
      user_shared_id
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
