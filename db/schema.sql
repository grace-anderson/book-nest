DROP DATABASE IF EXISTS book-ness_db;

CREATE DATABASE book-ness_db;

use book-ness_db

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

CREATE TABLE `books`(
`id` INT NOT NULL AUTO_INCREMENT , 
`Title` VARCHAR(45) NOT NULL ,
`Author` VARCHAR(45) NOT NULL ,
`genres` VARCHAR(45) NOT NULL ,
`ISBN` INT(17) NOT NULL ,
`Year` INT(4) NOT FULL ,
PRIMARY KEY(`id`)
-- foreign KEY ()
)




