const schema_mongoose = require('mongoose');

const BookSchema = schema_mongoose.Schema(
    {
        bookname: {type: String},
        authorname: { type: String },
        genresname: { type: String },
        booknumberofpages: { type: String},
        bookpublisher: {type: String },
        bookprice: { type: String },
        bookpublicationdate: { type: String },
        
    },
    {
        timestamps: true
    }
);

module.exports = schema_mongoose.model('book_schema_collection',BookSchema);