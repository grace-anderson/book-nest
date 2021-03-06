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
  // pass in the logged in status
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });
});

// GET THE LOGIN PAGE
router.get('/login', (req, res) => {
  // if user is logged in and somehow gets to this page, redirect
  if (req.session.loggedIn) {
    res.redirect('/view-books');
    return;
  }
  // otherwise display login page
  res.render('login');
});

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  // pass in the logged in status
  res.render('logout', {
    loggedIn: req.session.loggedIn
  });
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

    // map to plain object
    const books = bookData.map((book) => book.get({ plain: true }));

    res.render('viewbooks', {
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
    // get the book id out of req.params
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

    // map to plain object
    const selectedBook = bookData.get({ plain: true });

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
  // render sharebook page and pass in logged in status
  res.render('shareBook', {
    loggedIn: req.session.loggedIn
  });
});

// RETRIEVE AND DISPLAY BOOKS SHARED BY USER
router.get('/profile', withAuth, async (req, res) => {
  try {
    // get the id of the session user
    const sessionUserId = req.session.user_id;

    // getting the username out
    const userData = await User.findByPk(sessionUserId);
    const user = userData.get({ plain: true });
    const { username } = user;

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

    // map to plain object
    const readingListBooks = readingListBookData.map((readingListBooks) =>
      readingListBooks.get({ plain: true })
    );

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

    // map to plain object
    const sharedBooks = sharedBookData.map((book) => book.get({ plain: true }));

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
    /* HOW THIS PAGE DISPLAYS ITS SEARCH MESSAGES:
      ---
      There are message blocks that should appear under the search button depending on the condition of the page:
        1) When you first open the page, there should be no message
        2) When you search and find a book, some flavour text along with the found books should appear
        3) When you search and DON'T find a book, some flavour text (error message) should appear
      ---
      There are two flags used to help determine the correct condition:
        1) req.query.title (which is the search input)
        2) payload (ie returned book results)
      ---
      Conditions for each message type:
        1) NO MESSAGE (blank):
            > NO query.title & NO payload
        2) FOUND BOOKS message:
            > YES query.title & YES payload
        3) NO FOUND BOOKS message:
            > YES query.title & NO payload
    */

    // set search input as variable
    const searchInput = req.query.title;

    // set up flags
    let payloadFlag = false;
    let queryTitleFlag = searchInput;

    // find the book
    const books = await Book.findAll({
      include: [{ model: Genre, attributes: ['genre_title'] }],
      where: {
        title: {
          [Op.like]: '%' + searchInput + '%' // wildcard search
        }
      }
    });

    // get the returned books and map to plain object
    const payload = books.map((book) => book.get({ plain: true }));

    // if there are books then set payload flag to true
    if (payload.length) {
      payloadFlag = true;
    }

    // pass on values to findBook handlebars
    res.render('findBook', {
      books: payload,
      payloadFlag: payloadFlag, // set the flag value
      queryTitleFlag: queryTitleFlag, // set the query title flag value
      loggedIn: req.session.loggedIn
    });
  } catch (error) {
    console.log('\n---BOOK ROUTES: FIND BOOK ERR');
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
