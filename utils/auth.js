const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    // If the user is not logged in, redirect to the login page
    res.redirect('/');
    return;
  } else {
    // If the user is logged in, allow opening selected route
    next();
  }
};

module.exports = withAuth;
