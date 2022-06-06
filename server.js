// import dotenv
require('dotenv').config();

// import express modules
const path = require('path');
const express = require('express');
const session = require('express-session');

// import handlebars and hbs helpers
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// import routes
const routes = require('./controllers');

// establish sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// establish helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.COOKIE_SECRET, // change to environment variable (cookie now private)
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// create session
app.use(session(sess));

// use handlebars and hbs helpers
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use(routes);

// start the server!
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
});
