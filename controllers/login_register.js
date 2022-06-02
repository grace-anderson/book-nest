const express = require('express');
const Router = express.Router();

Router.get('/showLogin',  (req, res) => {
    res.render('login');
});

Router.get('/showRegister',  (req, res) => {
    res.render('register');
});

module.exports = Router;