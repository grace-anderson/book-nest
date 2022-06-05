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

// ====== BELOW:
// ROUTES THAT WORK

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
    books,
    loggedIn: req.session.loggedIn
  });
});

// RETRIEVE AND DISPLAY A SINGLE BOOK BY ITS ID
router.get('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

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

    const selectedBook = bookData.get({ plain: true });

    console.log('\n---HOME ROUTES: SELECTED BOOK');
    console.log(selectedBook);

    // res.status(200).json(selectedBook);
    res.render('bookCard', {
      selectedBook,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// RETRIEVE AND DISPLAY BOOKS SHARED BY USER
router.get('/profile', async (req, res) => {
  try {
    const sessionUserId = req.session.user_id;

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
      sharedBooks,
      readingListBooks,
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    console.log('\n---HOME ROUTES: SHARED BY ERR');
    console.log(error);
    res.status(500).json(error);
  }
});

// SEARCH FOR A BOOK (BY ITS TITLE)
router.get('/find-book', async (req, res) => {
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
      books: payload,
      loggedIn: req.session.loggedIn
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

// TODO: Display user's profile with list of books
// router.get('/profile', withAuth, async (req, res) => {
//   // // TODO: If user not logged in, redirect to login page
//   // if (!req.session.loggedIn) {
//   //   res.redirect('/login');
//   //   return;
//   // }

//   try {
//     // if (req.session.loggedIn) {
//     console.log('\n---HOME ROUTES: REQ.SESSION');
//     console.log(req.session);

//     const bookData = await Book.findAll({
//       where: {
//         user_shared_id: req.session.user_id
//       }
//     });
//     const books = bookData.map((book) => book.get({ plain: true }));

//     // TODO format date
//     // for (let i = 0; i < books.length; i++) {
//     //   books[i].sharedDate = books[i].date_added.toLocaleDateString();
//     //   format_date(books[i].sharedDate);
//     // }

//     res.render('profile', {
//       books,
//       loggedIn: req.session.loggedIn,
//       pageDescription: 'Your Profile'
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// TODO: Create (share) a new book
// router.get('/share-book', withAuth, async (req, res) => {
//   res.render('shareBook', {
//     loggedIn: req.session.loggedIn
//   });
// });

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
