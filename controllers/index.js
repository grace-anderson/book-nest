const router = require('express').Router();

// define routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

// establish the routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
