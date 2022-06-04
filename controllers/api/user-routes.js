const router = require('express').Router();
const { User, Reading_List, Book } = require('../../models');

// get all users (testing)
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Reading_List }, { model: Book }]
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

    const returningUser = await User.scope('withPassword').findOne({
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
    // console.log(`\n------ERROR:`);
    // console.log(error);
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/', async (req, res) => {
  try {
    // console.log(`\n---REQ.BODY SIGNUP?`)
    // console.log(req.body);

    const { username, email, password } = req.body;

    if (username && email && password) {
      const newUser = await User.create(req.body);

      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.loggedIn = true;

        // console.log(`\n---REQ.SESSION NEW USER`);
        // console.log(newUser);

        res.status(200).json(newUser);
      });
    } else {
      alert(
        'Signup failed. Please enter a valid username, email, and password.'
      );
    }
  } catch (error) {
    // console.log(`\n---ERROR:`);
    // console.log(error);
    res.status(500).json(error);
  }
});

// router.post('/register', async (req, res) => {
//   try {
//     const user = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//     });

//     if (!user) {
//       alert('Failed to register a user.');
//       return;
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
