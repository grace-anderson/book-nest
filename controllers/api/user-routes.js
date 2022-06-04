// IMPORT MODULES
const router = require('express').Router();
const { User, Reading_List, Book } = require('../../models');

// GET ALL USERS (FOR BACKEND TESTING)
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

    console.log('\n---USER_ROUTE LOGIN: EMAIL/PASSWORD');
    console.log(email);
    console.log(password);

    const returningUser = await User.findOne({
      where: {
        email: email
      }
    });

    // console.log(`\n----RETURNING USER`);
    // console.log(returningUser);

    if (!returningUser) {
      return res.status(400).json({
        message: 'Incorrect email. Please try again.'
      });
    }

    const userPassword = await returningUser.checkPassword(password);

    if (!userPassword) {
      return res.status(400).json({
        message: 'Incorrect password. Please try again.'
      });
    }

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
    // console.log('\n------ERROR:');
    console.log(error);
    res.status(500).json(error);
  }
});

// SIGN A NEW USER UP
router.post('/', async (req, res) => {
  try {
    let [found] = await User.findAll({
      where: {
        email: req.body.email
      }
    });
    if (found) {
      return res.status(400).send('User with the provided email already exist');
    }
    [found] = await User.findAll({
      where: {
        username: req.body.username
      }
    });
    if (found) {
      return res
        .status(400)
        .send('User with the provided username already exist');
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    console.log({ body: req.body });

    if (!user) {
      alert('Failed to register a user.');
      return;
    }
  } catch (error) {
    console.log('\n---ERROR:');
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
router.post('/register', async (req, res) => {
  try {
    let [found] = await User.findAll({
      where: {
        email: req.body.email
      }
    });
    if (found) {
      return res.status(400).send('User with the provided email already exist');
    }
    [found] = await User.findAll({
      where: {
        username: req.body.username
      }
    });
    if (found) {
      return res
        .status(400)
        .send('User with the provided username already exist');
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    console.log({ body: req.body });

    if (!user) {
      alert('Failed to register a user.');
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
