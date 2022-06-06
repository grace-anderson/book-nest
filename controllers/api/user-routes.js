// IMPORT MODULES
const router = require('express').Router();
const { User, Reading_List, Book } = require('../../models');

// path: /api/users

// get all users (for testing purposes)
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        // ! prettier-ignore
        { model: Reading_List },
        { model: Book }
      ]
    });

    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// WHEN USER LOGS IN
router.post('/login', async (req, res) => {
  try {
    // get the values from front end
    const { email, password } = req.body;

    // if if there is an existing user
    const returningUser = await User.findOne({
      where: {
        email: email
      }
    });

    // send error if user doesn't exist
    if (!returningUser) {
      return res.status(400).json({
        message: 'Incorrect email. Please try again.'
      });
    }

    // check the input password with the hashed password
    const userPassword = await returningUser.checkPassword(password);

    // send error if password is wrong
    if (!userPassword) {
      return res.status(400).json({
        message: 'Incorrect password. Please try again.'
      });
    }

    // save the session
    req.session.save(() => {
      req.session.user_id = returningUser.id;
      req.session.loggedIn = true;

      const { username } = returningUser;
      const welcomeMsg = `Welcome back, ${username}!`;
      res.status(200).json({
        message: welcomeMsg
      });
    });
  } catch (error) {
    console.log('\n---USER ROUTE: LOGIN ERR');
    console.log(error);
    res.status(500).json(error);
  }
});

// SIGN A NEW USER UP
router.post('/', async (req, res) => {
  try {
    // get values from front end
    const { username, email, password } = req.body;

    if (username && email && password) {
      // make a new user
      const newUser = await User.create(req.body);

      // create new reading list and attach to user
      const newReadingList = await Reading_List.create({
        reader_id: newUser.id
      });

      // save the session
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.loggedIn = true;

        // send back the new user
        res.status(200).json({
          newUser,
          id: newUser.id,
          newReadingList
        });
      });
    } else {
      res.status(400).json({
        message: 'Could not sign user up.'
      });
    }
  } catch (error) {
    console.log('\n---USER ROUTE: SIGNUP ERR');
    console.log(error);

    // create an error object to store the errors
    const errObj = {};
    // map the errors as 'email': 'email error msg' and 'username': 'username error msg'
    error.errors.map((er) => {
      errObj[er.path] = er.message;
    });
    // send status and error object
    res.status(400).json(errObj);
  }
});

// LOG THE USER OUT
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
