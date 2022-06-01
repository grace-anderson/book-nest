DROP DATABASE IF EXISTS usermanagment_db;

CREATE DATABASE usermanagment_db;

use usermanagment_db

CREATE TABLE `user` ( 
    `id` INT NOT NULL AUTO_INCREMENT ,
 `first_name` VARCHAR(45) NOT NULL ,
  `last_name` VARCHAR(45) NOT NULL ,
   `email` VARCHAR(45) NOT NULL ,
    `phone` VARCHAR(45) NOT NULL ,
     `comments` TEXT NOT NULL ,
      `status` VARCHAR(10) NOT NULL DEFAULT 'active' ,
       PRIMARY KEY (`id`)
       ); 
       


CREATE TABLE genres(`id` INT NOT NULL AUTO_INCREMENT, `genre_title` varchar(100), primary key(`id`))

insert into genres(genre_title) values ('Sci fi');
 insert into genres(genre_title) values ('Fantasy'); 
 insert into genres(genre_title) values ('High bro literature'); 
  insert into genres(genre_title) values ('Graphic novels'); 
   insert into genres(genre_title) values ('Romance');       
    insert into genres(genre_title) values ('Historical'); 
     insert into genres(genre_title) values ('Non-fiction'); 


CREATE TABLE `books`(
`id` INT NOT NULL AUTO_INCREMENT ,
`title` VARCHAR(45) NOT NULL ,
`author` VARCHAR(145) NOT NULL ,
`genre_id` INT NOT NULL,
`isbn` VARCHAR(17) NOT NULL ,
`year` INT(4) NOT NULL ,
`age_for` VARCHAR(32) NOT NULL,
PRIMARY KEY(`id`),
FOREIGN KEY (genre_id) REFERENCES genres(id)
);

INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Harry Potter', 'J.k.Rowling', 1, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Sci fi', 'J.k.Rowling', 1, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Fantasy', 'J.k.Rowling', 2, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Fantasy', 'J.k.Rowling', 2, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Fantasy', 'J.k.Rowling', 2, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Fantasy', 'J.k.Rowling', 2, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('High bro literature', 'J.k.Rowling', 3, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('High bro literature', 'J.k.Rowling', 3, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Graphic novels', 'J.k.Rowling', 4, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Graphic novels', 'J.k.Rowling', 4, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Romance', 'J.k.Rowling', 5, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Romance', 'J.k.Rowling', 5, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Romance', 'J.k.Rowling', 5, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Romance', 'J.k.Rowling', 5, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Romance', 'J.k.Rowling', 5, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Romance', 'J.k.Rowling', 5, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Romance', 'J.k.Rowling', 5, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Historical', 'J.k.Rowling', 6, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Historical', 'J.k.Rowling', 6, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Non-fiction', 'J.k.Rowling', 7, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Non-fiction', 'J.k.Rowling', 7, '123456', 2011, 'children')
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('The 48 Laws of Power', 'Robert Greene, Joost Ellfers, Joost Elffers', 1, '9781861972781', 2013, 'all');;
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('The Art of Seduction', 'Robert Greene, Joost Ellfers, Joost Elffers', 1, '9781861972486', 2001, 'all');
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('The 33 Strategies of War', 'Robert Greene, Joost Ellfers, Joost Elffers', 1, '9781861972784', 2007, 'all');
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('The 50th Law', 'Robert Greene, Joost Ellfers, Joost Elffers', 1, '9781861972998', 2009, 'all');
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Mastery', 'Robert Greene, Joost Ellfers, Joost Elffers', 1, '9781861972145', 2012, 'all');
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Mastery', 'Robert Greene, Joost Ellfers, Joost Elffers', 1, '9781861972145', 2012, 'all');
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Hentai', 'Goku Vegata, Naturo Uzamaki', 1, '9781861784001', 2012, 'adults');
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Lord Of The Rings, Return Of the Kings', 'J. R. R. Tolkien', 1, '9781861784001', 2003, 'all');
INSERT INTO books(title, author, genre_id, isbn, year, age_for) values('Wheres Wally Now?', 'Martin Handford', 1, '9781000784001', 1988, 'children');


-- when downloading book details of book and user will be stored in the database
CREATE TABLE `bookdownload`(
`id` INT NOT NULL AUTO_INCREMENT , 
`title` VARCHAR(45) NOT NULL 
--  foreign key of books and user 
)

CREATE TABLE `adult`(
`id` INT NOT NULL AUTO_INCREMENT , 
`title` VARCHAR(45) NOT NULL 
--  foreign key of books and user 
)
CREATE TABLE `children`(
`id` INT NOT NULL AUTO_INCREMENT , 
`title` VARCHAR(45) NOT NULL 
--  foreign key of books and user 
)




INSERT INTO `user` 
    ( `first_name`,  `last_name`,    `email`,                 `phone`,         `comments`, `status`) 
VALUES
    ('Amanda',      'Nunes',        'anunes@ufc.com',        '012345 678910', '',          'active'),
    ('Alexander',   'Volkanovski',  'avolkanovski@ufc.com',  '012345 678910', '',          'active'),
    ('Khabib',      'Nurmagomedov', 'knurmagomedov@ufc.com', '012345 678910', '',          'active'),
    ('Kamaru',      'Usman',        'kusman@ufc.com',        '012345 678910', '',          'active'),
    ('Israel',      'Adesanya',     'iadesanya@ufc.com',     '012345 678910', '',          'active'),
    ('Henry',       'Cejudo',       'hcejudo@ufc.com',       '012345 678910', '',          'active'),
    ('Valentina',   'Shevchenko',   'vshevchenko@ufc.com',   '012345 678910', '',          'active'),
    ('Tyron',       'Woodley',      'twoodley@ufc.com',      '012345 678910', '',          'active'),
    ('Rose',        'Namajunas ',   'rnamajunas@ufc.com',    '012345 678910', '',          'active'),
    ('Tony',        'Ferguson ',    'tferguson@ufc.com',     '012345 678910', '',          'active'),
    ('Jorge',       'Masvidal ',    'jmasvidal@ufc.com',     '012345 678910', '',          'active'),
    ('Nate',        'Diaz ',        'ndiaz@ufc.com',         '012345 678910', '',          'active'),
    ('Conor',       'McGregor ',    'cmcGregor@ufc.com',     '012345 678910', '',          'active'),
    ('Cris',        'Cyborg ',      'ccyborg@ufc.com',       '012345 678910', '',          'active'),
    ('Tecia',       'Torres ',      'ttorres@ufc.com',       '012345 678910', '',          'active'),
    ('Ronda',       'Rousey ',      'rrousey@ufc.com',       '012345 678910', '',          'active'),
    ('Holly',       'Holm ',        'hholm@ufc.com',         '012345 678910', '',          'active'),
    ('Joanna',      'Jedrzejczyk ', 'jjedrzejczyk@ufc.com',  '012345 678910', '',          'active')


CREATE TABLE `readinglist`(id INT NOT NULL AUTO_INCREMENT, bookId INT NOT NULL, userId INT NOT NULL,
foreign key(bookId) REFERENCES books(id), foreign key(userId) REFERENCES user(id), primary key(id));