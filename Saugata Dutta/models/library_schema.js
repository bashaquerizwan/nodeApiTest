const schema_mongoose = require('mongoose');

const library_schema = schema_mongoose.Schema(
    {
    bookid:{type:String},
    bookname: { type: String },
    bookauthor: { type: String },
    bookpublisher: { type: String },
    bookgenre: { type: String },
    }, 
    {
       timestamps: true
    }
    );
    module.exports = schema_mongoose.model('library_details_collection', library_schema);