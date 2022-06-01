// Dependencies
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const exphbs = require('express-handlebars');
const sequlize = require('./config/connection');
const books = require('./controllers/books');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3030;


// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
// const handlebars = exphbs.create({ extname: '.hbs', });
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views', 'layouts'))
hbs.registerPartials( path.join(__dirname, 'views', 'partials'))

//rendering the main hbs file in view.
app.get('/', (req, res) => {
    res.render("main");
});

app.use(books);

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})




