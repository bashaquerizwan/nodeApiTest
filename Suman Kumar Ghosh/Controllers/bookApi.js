const express=require("express");
var router=express.Router();

//import bookSchema
const bookModel=require("../Models/bookSchema");

//For book  register
router.post('/registerbook',(req,res)=>{

    const book=new bookModel({
        "bookAuthor":req.body.bookAuthor,
        "bookGenre":req.body.bookGenre,
        "bookName":req.body.bookName,
        "bookImage":req.body.bookImage,
        "bookPrice":req.body.bookPrice,
        "bookIsbn":req.body.bookIsbn
    })
    book.save()
    .then((bookdata)=>{
        res.status(202).json({success:true,book:bookdata})
    })
    .catch((error)=>{
        res.status(404).json({success:false,msg:`book register fail: ${error}` })
        process.exit();
    })
})

//For get all books
router.get('/viewbook',(req,res)=>{
    bookModel.find().sort({"_id":-1})
    .then((bookdata)=>{
        if(bookdata.length>0){
            res.status(200).json({success:true,result:bookdata})
        }
        else{
            res.status(404).json({success:false,msg:"No book found"})
        }
    })
    .catch((error)=>{
        res.status(505).send({success:false ,msg:error})
    })
})

//For search book using bookAuthor and bookGenre
router.get('/search/:bookAuthor/:bookGenre',(req,res)=>{
    bookModel.find({$and:[{"bookAuthor":req.params.bookAuthor},{"bookGenre":req.params.bookGenre}]})
    .then(book=>{
        if(book.length!=0){
            res.status(200).json({success:true,result:book}) 
        }
        else{
            res.status(404).json({success:false,msg:"No record Found"}) 
        }
         
    })
    .catch((error)=>{
        res.status(505).json({success:false,msg:error})
    })
})


//For update book using bookAuthor and bookGenre
router.put('/updatebook',(req,res)=>{
    bookModel.updateMany({$or:[{"bookAuthor":req.query.bookAuthor},{"bookGenre":req.query.bookGenre}]},{
        $set:{
            "bookPrice":req.body.bookPrice,
            "publishers":req.body.publishers,
            "bookImage":req.body.bookImage
        }     
    },
    {
        new:true
    }
    )
    .then((updatebook)=>{
        if(updatebook.modifiedCount!=0){
            res.status(200).json({success:true,result:`${updatebook.modifiedCount} object upated`})
        }
        else{
            res.status(404).json({success:false,msg:"No record found"})
        }
        
    })
    .catch((error)=>{
        res.status(404).json({success:false,msg:error})
    })
    
})

//For delete book using bookIsbn
router.delete('/deletebook',(req,res)=>{
    bookModel.deleteMany({$or:[{"bookAuthor":req.query.bookAuthor},{"bookGenre":req.query.bookGenre}]})
    .then((deletebook)=>{
        if(deletebook.deletedCount!=0){
            res.status(200).json({success:true,msg:`${deletebook.deletedCount} deleted successfully`})
        }
        else{
            res.status(404).json({success:false,msg:"No record found"})
        }
    })
    .catch((error)=>{
        res.status(505).json({success:false,msg:"error in delete book"})
    })
    
})


module.exports=router