const router = require('express').Router();

// for readability
const userRoutes = require('./user-routes');
const bookRoutes = require('./book-routes');
const readingListRoutes = require('./reading-list-routes');

// establish the routes
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/reading-list', readingListRoutes);

module.exports = router;
