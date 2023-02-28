const mongoose = require("mongoose");

// node-validator is a simple, extensible object property validator for node.js
// It includes direct support for express.js, and can be used as express middleware to automatically validating request body content.
const validator = require("validator");

const librarySchema = new mongoose.Schema({
    bookname : {
        type: String,
        
    },
    bookgenre : {
        type: String,
        
    },
    bookauthor : {
        type: String,
        
    },
    bookpublisher : {
        type: String,
        
    },
    bookprice : {
        type: Number,
        
    }
})

// Creating a new Collection
const Library = new mongoose.model('Libraray', librarySchema);

//For exporting this model
module.exports = Library;