/**
 *  We are using hardcoded data here, where would our data usually come from? Remember -
 *  we haven't yet set up a database or Sequelize in our app.
 *  */
const express = require('express');
const db = require('../config/connection');
const Router = express.Router();

// select * from books inner join genres on genres.id = books.genre_id where age_for='all' and genres.id in(1,2) limit 3;


Router.get('/books',  (req, res) => {
   try {
    db.query("select * from books", (err, results) => {
        if(err) {
            console.log(err);
            return res.status(400).send();
        };

        db.query('select * from genres', (err, genres) => {
            if(err) {
                console.log(err);
                return res.status(400).send();
            }
            console.log({genres});
            res.render('books', {
                books: results,
                genres
            });
        })
      //  res.send(results);
    })
   } catch (error) {
      return res.status(400).send();
   }
});

Router.post('/searchBooks', (req, res) => {
   try {
        const { age_for,  titlesCount, selectedGenreIds } = req.body;
        console.log({body: req.body});
        const query = `select books.id as bookId, title, author, genre_id, isbn, year, age_for, genre_title from books inner join genres on genres.id = books.genre_id where age_for='${age_for}' and genres.id in(${selectedGenreIds.join(",")}) limit ${titlesCount}`;
        console.log({query});
        db.query(query, (err, result) =>{
            if(err) {
                console.log(err);
                return res.status(400).send("No matching books found.");
            };
            console.log({result});
            res.send(result);
        });
   } catch (error) {
       return res.status(400).send();
   }
});

Router.get('/viewBook/:bookId', async (req, res) => {
try {
    const bookId = +req.params.bookId;
    console.log({bookIds: bookId});
    db.query(`select id, title from books where id=${bookId}`, (err, result) => {
        console.log({bookResult: result[0]?.title});
        const {title, id} =  result[0] || {};
        res.render('viewBook', {
            title,
            id
        })
    })
} catch (error) {
    res.status(400).send();
}
});

Router.post('/findBook', async (req, res) => {
    try {
        const {title} = req.body;
        db.query(`select * from books where title=${title}`, (err, result) =>{
            if(err) {
                console.log(err);
                return res.status(400).send();
            }
            return res.send(result);
        })
    } catch (error) {
        res.status(400).send();
    }
});


Router.get('/searchForBook', (req, res) => {
    res.render('findBook')
});

Router.post('/addToReadingList/:userId/:bookId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookId = req.params.bookId;
        db.query(`select bookId from readinglist where userId=${userId} and bookId=${bookId}`, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).send();
            };
            const bookFound = result[0]?.bookId;
            console.log({bookFound});
            if(!bookFound) {
                db.query(`insert into readinglist(bookId, userId) values(${bookId}, ${userId})`, (err) => {
                    if(err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    res.status(201).send();
                })
            } else {
                res.status(200).send("Book is already added to reading list");
            }
        })
       /* db.query(`insert into readinglist(bookId, userId) values(${bookId}, ${userId})`, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(201).send();
        })*/
    } catch (error) {
        
    }
});

Router.get('/viewMyBooks/:userId', (req, res) => {
    db.query(`select distinct title, author from readinglist inner join books on readinglist.bookId = books.id inner join user on user.id = readinglist.userId
    where readinglist.userId=${req.params.userId}`, (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).send();
        }
        console.log({mybooks: result});
        res.render('myBooks', {myBooks: result});
    })
});

Router.get('/shareBook', (req, res) => {
    res.render('shareBook');
})

module.exports = Router;