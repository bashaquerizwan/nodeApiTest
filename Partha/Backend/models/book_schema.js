const schema_mongoose=require('mongoose');


const BookSchema = schema_mongoose.Schema(
    {
    bookname:{type:String},
    authername:{type:String},
    booktype:{type:String},
    bookpage:{type:Number},
    bookprice:{type:Number},
    bookadddate:{type:String},
    bookaddtime:{type:String},
    bookpublisher:{type:String}
    }, 
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('book_details_collection',BookSchema);