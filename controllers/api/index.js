const router = require('express').Router();

// const userRoutes = require('./user-routes');
// const blogRoutes = require('./blog-routes');
const bookRoutes = require('./book-routes');

// router.use('/users', userRoutes);
// router.use('/blog', blogRoutes);
router.use('/book', bookRoutes);

module.exports = router;