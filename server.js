// import dotenv
require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// uncomment when api routes have been established (refer to line 47 as well)
const routes = require('./controllers');

// uncomment when helpers have been added (refer to line 21 as well)
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// when helpers have been added:
// delete the following line:
// const hbs = exphbs.create();
// and then UNCOMMENT the following line:
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// uncomment when routes have been established
app.use(routes);

// app.get('/', (req, res) => {
//   res.render('login');
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
});
