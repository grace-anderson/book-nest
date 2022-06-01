const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a book
router.post('/new', withAuth, async (req, res) => {
  try {
    const bookData = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      user_shared_id: req.session.loggedInId
    });

    if (!bookData.content) {
      alert('Failed to share book. Remember to add title, author and genre.');
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update book
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

// Delete a book
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

module.exports = router;
