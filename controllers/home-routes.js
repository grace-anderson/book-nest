// IMPORT MODULES AND HELPERS
const router = require('express').Router();
const { Op } = require('sequelize');
const withAuth = require('../utils/auth');
// IMPORT MODELS
const {
  User,
  Book,
  // Reading_List,
  // Book_Reading_List,
  Genre,
  User
} = require('../models');

// ====== BELOW:
// ROUTES THAT WORK

// GET THE HOMEPAGE
router.get('/', (req, res) => {
  res.render('homepage');
});

// GET THE LOGIN PAGE
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/view-books');
    return;
  }
  res.render('login');
});

// RETRIEVE AND DISPLAY ALL BOOKS
router.get('/view-books', async (req, res) => {
  const bookData = await Book.findAll({
    include: [
      {
        model: Genre,
        attributes: ['genre_title']
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  });

  // console.log('\n---HOME ROUTES: BOOK DATA');
  // console.log(bookData);

  const books = bookData.map((book) => book.get({ plain: true }));

  console.log('\n---HOME ROUTES: BOOK (mapped) DATA');
  // console.log(books);

  res.render('viewBooks', {
    books
  });
});

// RETRIEVE A SINGLE BOOK BY ITS ID
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
    res.render('bookCard', {
      selectedBook
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// SEARCH FOR A BOOK (BY ITS TITLE)
router.get('/find', async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: '%' + req.query.title + '%'
        }
      }
    });

    const payload = books.map((book) => book.get({ plain: true }));

    res.render('findBook', {
      books: payload
    });
  } catch (err) {
    console.log(err);
    res.render('findBook', {
      //fix - don't send back err
      error: err
    });
  }
});

// ===== BELOW:
// ROUTES IN PROGRESS

// TODO: Display user's profile with list of books
router.get('/profile', withAuth, async (req, res) => {
  // // TODO: If user not logged in, redirect to login page
  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  //   return;
  // }

  try {
    // if (req.session.loggedIn) {
    console.log('\n---REQ.SESSION');
    console.log(req.session);

    const bookData = await Book.findAll({
      where: {
        user_shared_id: req.session.user_id
      }
    });
    const books = bookData.map((book) => book.get({ plain: true }));

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
router.get('/share-book', withAuth, async (req, res) => {
  res.render('createBook', {
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

// ==== BELOW:
// ROUTES NOT IN USE OR NOT WORKING

// GET VIEW BOOKS PAGE
// getting login route to the front end
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// getting register route to the front end
// router.get('/showRegister', (req, res) => {
//   res.render('register');
// });

//create book page
// router.get('/book/:id', async (req, res) => {
//   try {
// //identify the retrieved, clicked book
// //open a page with that one book's details
// Book.findByPk({
//   where: {
//     id: req.params.id
//   }
// })

//   } catch {}
// });

module.exports = router;
