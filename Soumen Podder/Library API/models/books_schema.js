//BOOK PROPERTY

const myscheema=require('mongoose');

const book=myscheema.Schema({
    book_id:{type:String},
    book_name:{type:String},
    book_author:{type:String},
    book_publisher:{type:String},
    book_genre:{type:String},
    book_price:{type:Number},
    book_description:{type:String},
    book_edition:{type:Number}

},{
    timestamps:true,
})

module.exports=myscheema.model('booksdata',book)