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
    const { email, password } = req.body;

    // if if there is an existing user
    const returningUser = await User.findOne({
      where: {
        email: email
      }
    });

    // console.log(`\n----RETURNING USER`);
    // console.log(returningUser);

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
    const { username, email, password } = req.body;

    // console.log('\n---USER ROUTES: REQ.BODY');
    // console.log(username, email, password);

    // BELOW: trying to add validation checks and return useful message in the browser, but not working 100%

    // const doesUserExist = await User.findOne({
    //   where: {
    //     username: username
    //   }
    // });

    // const doesEmailExist = await User.findOne({
    //   where: {
    //     email: email
    //   }
    // });

    // console.log('\n---IS USERNAME & EMAIL UNIQUE');
    // console.log(doesUserExist, username);
    // console.log(doesEmailExist, email);

    // if (doesUserExist) {
    //   console.log('username exists');
    //   return res.status(400).json({
    //     message: 'Username already exists'
    //   });
    // }

    // if (doesEmailExist) {
    //   console.log('email exists');
    //   return res.status(400).json({
    //     message: 'Email already exists'
    //   });
    // }

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
    res.status(500).json(error);
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

// ==== BELOW:
// ROUTES IN PROGRESS

// ===== BELOW:
// ROUTES NOT IN USE OR NOT WORKING

// SIGN UP CHECK - NOT WORKING
// router.post('/signup-check', async (req, res) => {
//   try {
//     // console.log(`\n---REQ.BODY SIGNUP?`)
//     // console.log(req.body);

//     const { username, email, password } = req.body;

//     console.log('\n---USER ROUTES: REQ.BODY');
//     console.log(username, email, password);

//     const doesUserExist = await User.findOne({
//       where: {
//         username: username
//       }
//     });

//     const doesEmailExist = await User.findOne({
//       where: {
//         email: email
//       }
//     });

//     console.log('\n---IS USERNAME & EMAIL UNIQUE');
//     console.log(doesUserExist, username);
//     console.log(doesEmailExist, email);

//     if (doesUserExist) {
//       console.log('username exists');
//       return res.status(400).json({
//         message: 'Username already exists'
//       });
//     }

//     if (doesEmailExist) {
//       console.log('email exists');
//       return res.status(400).json({
//         message: 'Email already exists'
//       });
//     }

//     if (!doesUserExist && !doesEmailExist) {
//       res
//         .status(200)
//         .json({ message: 'Validations passed! All set to create a new user' });
//     } else {
//       res.status(400).json({
//         message: 'Something went wrong'
//       });
//     }
//   } catch (error) {
//     console.log('\n---ERROR:');
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

module.exports = router;
