const router = require('express').Router();
// const { User, Book } = require('../models');
const {
  // User,
  Book,
  // Reading_List,
  // Book_Reading_List,
  Genre
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.logged_in
  });
});

// getting login route to the front end
router.get('/showLogin', (req, res) => {
  res.render('login');
});

// getting register route to the front end
router.get('/showRegister', (req, res) => {
  res.render('register');
});

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

  console.log('\n---HOME ROUTES: BOOK (mapped) DATA');
  console.log(books);

  res.render('viewbooks', {
    books
  });
});

router.get('/showFindBook', (req, res) => {
  res.render('findBook');
});

//find a book
//TODO: update to fetch array, then search array to retrieve match with user entry
router.post('/find', async (req, res) => {
  try {
    const bookData = await Book.findOne({ where: { title: req.body.title } });
    console.log({ bookData });

    if (bookData) {
      const book = bookData.get({ plain: true });

      console.log({ book });
      res.send(book);
    } else {
      res.status(200).send('No matching book found.');
    }
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
