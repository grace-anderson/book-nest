const router = require('express').Router();
// const { User, Book } = require('../models');
const { Book } = require('../models');
const withAuth = require('../utils/auth');

// Display user's profile with list of books
router.get('/profile', async (req, res) => {
  // If user not logged in, redirect to login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  try {
    books = [];
    if (req.session.loggedIn) {
      const bookData = await Book.findAll({
        where: {
          user_shared_id: req.session.loggedInId
        }
      });
      books = bookData.map((book) => book.get({ plain: true }));
    }

    // TODO format date
    // for (let i = 0; i < books.length; i++) {
    //   books[i].sharedDate = books[i].date_added.toLocaleDateString();
    //   format_date(books[i].sharedDate);
    // }

    res.render('profile', {
      books,
      loggedIn: req.session.loggedIn,
      pageDescription: 'Your Profile'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create (share) a new book
router.get('/new-shared-book', withAuth, async (req, res) => {
  res.render('createBook', {
    pageDescription: 'Your Profile',
    loggedIn: req.session.loggedIn
  });
});

// Edit shared book
router.get('/book-update/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.findOne({
      where: {
        id: req.params.id
      }
    });
    const book = bookData.get({ plain: true });

    res.render('updateBook', {
      book,
      loggedIn: req.session.loggedIn,
      pageDescription: 'Your Profile'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
