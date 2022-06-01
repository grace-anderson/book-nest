// connection goes here

require('dotenv').config();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

db.connect((err)=> {
    if(err) {
      return  console.log('error while connecting to database');
    }
    console.log('connected to database successfully.');
})

module.exports = db;