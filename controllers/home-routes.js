// IMPORT MODULES AND HELPERS
const router = require('express').Router();
const { Op } = require('sequelize');
const withAuth = require('../utils/auth');
// IMPORT MODELS
const {
  User,
  Book,
  Genre,
  Book_Reading_List,
  Reading_List
} = require('../models');

// GET THE HOMEPAGE
router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });
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
  try {
    // get all book data
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

    // map to plain text
    const books = bookData.map((book) => book.get({ plain: true }));

    // console.log('\n---HOME ROUTES: BOOK (mapped) DATA');
    // console.log(books);

    res.render('viewBooks', {
      books,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    console.log('\n---HOME ROUTES: VIEW BOOKS ERR');
    console.log(error);
    res.status(400).json(error);
  }
});

// RETRIEVE AND DISPLAY A SINGLE BOOK BY ITS ID
router.get('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    // find the book using the req id
    const bookData = await Book.findByPk(bookId, {
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

    // map to plain text
    const selectedBook = bookData.get({ plain: true });

    console.log('\n---HOME ROUTES: SELECTED BOOK');
    console.log(selectedBook);

    res.render('bookCard', {
      selectedBook,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    console.log('\n---BOOK ROUTES: VIEW SINGLE BOOK ERR');
    console.log(error);
    res.status(400).json(error);
  }
});

// GET THE SHARE BOOK PAGE with the share book form
router.get('/share-book', withAuth, async (req, res) => {
  res.render('shareBook', {
    loggedIn: req.session.loggedIn
  });
});

// RETRIEVE AND DISPLAY BOOKS SHARED BY USER
router.get('/profile', withAuth, async (req, res) => {
  try {
    const sessionUserId = req.session.user_id;

    // getting the username out
    const userData = await User.findByPk(sessionUserId);
    const user = userData.get({ plain: true });
    const { username } = user;

    // console.log('\n---HOME ROUTES: REQ.SESSION PROFILE');
    // console.log(req.session.user_id);

    // get the reading list data out of db
    const readingListBookData = await Book_Reading_List.findAll({
      include: [
        {
          model: Book,
          // include all book's nested associations in the book-reading-list data (ie. genre > genre_title; user > all user values)
          // https://stackoverflow.com/questions/33941943/nested-include-in-sequelize
          include: { all: true, nested: true }
        },
        {
          model: Reading_List,
          where: {
            reader_id: sessionUserId
          }
        }
      ]
    });

    // map to plain text
    const readingListBooks = readingListBookData.map((readingListBooks) =>
      readingListBooks.get({ plain: true })
    );

    // console.log('\n---HOME ROUTES: READING LIST DATA');
    // console.log(readingListBooks);

    // get the list of books shared by the user
    const sharedBookData = await Book.findAll({
      include: [
        {
          model: Genre,
          attributes: ['genre_title']
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
      where: {
        user_shared_id: sessionUserId
      }
    });

    // map to plain text
    const sharedBooks = sharedBookData.map((book) => book.get({ plain: true }));

    // console.log('\n---HOME ROUTES: SHARED BOOKS (mapped) DATA');
    // console.log(sharedBooks);

    res.render('profile', {
      username,
      sharedBooks,
      readingListBooks,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    console.log('\n---HOME ROUTES: SHARED-BY-USER ERR');
    console.log(error);
    res.status(500).json(error);
  }
});

// SEARCH FOR A BOOK (BY ITS TITLE)
router.get('/find-book', async (req, res) => {
  try {
    let flag = false;

    // find the book
    const books = await Book.findAll({
      include: [{ model: Genre, attributes: ['genre_title'] }],
      where: {
        title: {
          [Op.like]: '%' + req.query.title + '%'
        }
      }
    });

    const payload = books.map((book) => book.get({ plain: true }));

    console.log('\n---HOME ROUTES: PAYLOAD (before flag)');
    console.log(payload);

    if (payload.length && flag === false) {
      flag = true;
    }

    console.log('\n---HOME ROUTES: FLAG');
    console.log(flag);

    // have a variable that's a boolean
    // use the ^ as the conditional rendering

    // console.log('\n---HOME ROUTES: PAYLOAD');
    // console.log(payload);

    res.render('findBook', {
      books: payload,
      flag: flag,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    console.log('\n---BOOK ROUTES: FIND BOOK ERR');
    console.log(error);
    // res.status(400).json(error);
    res.render('findBook', {
      //fix - don't send back err
      error: err
    });
  }
});

// ===== BELOW:
// ROUTES TO DEVELOP:

// TODO: Edit shared book
// router.get('/book-update/:id', withAuth, async (req, res) => {
//   try {
//     const bookData = await Book.findOne({
//       where: {
//         id: req.params.id
//       }
//     });
//     const book = bookData.get({ plain: true });

//     res.render('updateBook', {
//       book,
//       loggedIn: req.session.loggedIn,
//       pageDescription: 'Your Profile'
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
