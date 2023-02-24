const schema_mongoose=require('mongoose');


const bookSchema = schema_mongoose.Schema(
    {
    bookName: { type: String },
    authorName:{ type:String },
    genresName:{ type:String },
    bookPrice: { type: Number },
    bookPublisher:{ type:String },
    bookPublicationDate:{ type:String },
    bookLang:{ type:String },
    bookDescription:{ type:String },
    bookNoOfPage:{ type:Number },
}, 
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('book_details_collection',bookSchema);