const router = require('express').Router();
// const { User, Book } = require('../models');


// Route to create a new book
router.get('/new-book', (req, res) => {
  res.render('createBook', {
    pageDescription: 'Create-Book',
    // loggedIn: req.session.loggedIn
  });
});

module.exports = router;