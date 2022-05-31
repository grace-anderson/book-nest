const User = require('./User');
const Book = require('./Book');
const Reading_List = require('./Reading_List');
const Book_Reading_List = require('./Book_Reading_List');

//user can share many books
User.hasMany(Book, {
  foreignKey: 'user_shared_id',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_shared_id'
});

//user has one only reading list
User.hasOne(Reading_List, {
  foreignKey: 'reader_id',
  onDelete: 'CASCADE'
});

Reading_List.belongsTo(User, {
  foreignKey: 'reader_id'
});

//A reading list can have many books, join using Book_Reading_List
Reading_List.hasMany(Book_Reading_List, {
  foreignKey: 'book_reading_list_id',
  onDelete: 'CASCADE'
});

Book_Reading_List.belongsTo(Reading_List, {
  foreignKey: 'reading_list_id'
});

//One book can be on many Reading_Lists, join using Book_Reading_list
Book.hasMany(Book_Reading_List, {
  foreignKey: 'book_reading_list_id',
  onDelete: 'CASCADE'
});

Book_Reading_List.belongsTo(Book, {
  foreignKey: 'book_id'
});

module.exports = { User, Book, Reading_List, Book_Reading_List };
