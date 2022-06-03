const router = require('express').Router();

const userRoutes = require('./user-routes');
const bookRoutes = require('./book-routes');

router.use('/users', userRoutes);
router.use('/book', bookRoutes);

module.exports = router;
