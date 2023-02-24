const mongoose=require("mongoose");
const Database=process.env.Database

//create book schema
const bookModel=mongoose.Schema({
    bookIsbn:{type:String,required:true,unique:true},
    bookAuthor:{type:String,required:true},
    bookGenre:{type:String,required:true},
    bookName:{type:String},
    bookImage:{type:String},
    bookPrice:{type:Number},
    publishers:{type:String}  
},{
    timestamps:true
})

module.exports=mongoose.model(Database,bookModel)