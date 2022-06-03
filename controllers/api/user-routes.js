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

    console.log('\n----RETURNING USER');
    console.log(returningUser);

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
      req.session.logged_in = true;

      const { username } = returningUser;
      const welcomeMsg = `Welcome back, ${username}!`;
      res.status(200).json({
        message: welcomeMsg
      });
    });
  } catch (error) {
    // console.log('\n------ERROR:');
    // console.log(error);
    res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    if (!user) {
      alert('Failed to register a user.');
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
