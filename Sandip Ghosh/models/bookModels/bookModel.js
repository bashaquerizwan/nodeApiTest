const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        bookName : { type : String },
        bookAuthor : { type : String },
        bookGenre : { type : String },
        bookNumberOfPages : { type : Number },
        bookPrice : { type : Number },
        bookPublisher : { type : String }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('bookCollection', bookSchema);
//Exporting to services/bookServices/bookService.js