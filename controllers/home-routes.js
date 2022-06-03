const router = require('express').Router();
const {
  // User,
  Book,
  // Reading_List,
  // Book_Reading_List,
  Genre
} = require('../models');

// authentication import
const withAuth = require('../utils/auth');

// GET THE HOMEPAGE
router.get('/', (req, res) => {
  res.render('homepage');
});

// GET THE LOGIN PAGE
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/viewBooks');
    return;
  }
  res.render('login');
});

// GET VIEW BOOKS PAGE
router.get('/view-books', async (req, res) => {
  const bookData = await Book.findAll({
    include: [
      {
        model: Genre,
        attributes: ['genre_title']
      }
    ]
  });

  // console.log('\n---HOME ROUTES: BOOK DATA');
  // console.log(bookData);

  const books = bookData.map((book) => book.get({ plain: true }));

  // console.log('\n---HOME ROUTES: BOOK (mapped) DATA');
  // console.log(books);

  res.render('viewBooks', {
    books
  });
});

// FIND A BOOK
//TODO: update to fetch array, then search array to retrieve match with user entry
router.get('/find', async (req, res) => {
  try {
    const bookData = await Book.findOne({ where: { title: req.body.title } });

    const book = bookData.get({ plain: true });

    res.render('findBook', {
      book
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: Display user's profile with list of books
router.get('/profile', async (req, res) => {
  // TODO: If user not logged in, redirect to login page
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

// GET A SINGLE BOOK BY ITS ID
router.get('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    const bookData = await Book.findByPk(bookId, {
      include: [
        {
          model: Genre,
          attributes: ['genre_title']
        }
      ]
    });

    const selectedBook = bookData.get({ plain: true });

    console.log('\n---HOME ROUTES: SELECTED BOOK');
    console.log(selectedBook);

    // res.status(200).json(selectedBook);
    res.render('book', {
      selectedBook
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// TODO: Create (share) a new book
router.get('/new-shared-book', withAuth, async (req, res) => {
  res.render('createBook', {
    pageDescription: 'Your Profile',
    loggedIn: req.session.loggedIn
  });
});

// TODO: Edit shared book
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
