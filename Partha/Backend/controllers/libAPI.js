const express=require('express');
const { findOneAndRemove } = require('../models/book_schema');
const BookModel=require('../models/book_schema');
const router=express.Router();


//Book Add by post method
router.post('/addbook',(req,res)=>{
    var today=new Date();
    const bookobj=new BookModel({
        bookname:req.body.bookname.toLowerCase(),
        authername:req.body.authername.toLowerCase(),
        booktype:req.body.booktype.toLowerCase(),
        bookpage:req.body.bookpage,
        bookprice:req.body.bookprice,
        bookadddate:today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
        bookaddtime:today.getHours()+':'+today.getMinutes()+':'+today.getSeconds(),
        bookpublisher:req.body.bookpublisher
    })
    BookModel.find({$and:[{bookname:req.body.bookname.toLowerCase()},{authername:req.body.authername.toLowerCase()}]})
    .then((findresult) => {
        if(findresult.length==0){
            bookobj.save()
            .then((saveresult) => {
                res.send("Book Added Succesfully\n"+[saveresult]);
                console.log("Book Added Succesfully");
            }).catch((err) => {
                console.log("Error in Book Add...."+{message:err.message});
            });
        }
        else{
            res.send([]+"Book already added");
        }
    }).catch((err) => {
        console.log("Error in Book Add...."+{message:err.message});
    });
    
})


//View All Book
router.get('/viewallbook',(req,res)=>{
    BookModel.find()
    .then((bookresult) => {
        if(bookresult.length==0){
            res.send("No Data Found");
        }
        else{
            res.send("All Books in the Library\n"+bookresult);
        }
        
    }).catch((err) => {
        console.log("Error in view all Book...."+{message:err.message});
    });
})


//Book Search by Author name and Book Name and Book Type
router.get('/searchbook',(req,res)=>{
    BookModel.find({$and:[{bookname:req.query.bookname.toLowerCase()},{authername:req.query.authername.toLowerCase()},{booktype:req.query.booktype.toLowerCase()}]})
    .then((searchresult) => {
        if(searchresult==0){
            res.send("search result for:"+req.query.booktype+","+req.query.authername+","+req.query.bookname+"\n Result Not Found\n Enter Correct Details");
        }
        else{
            res.send("search result for:"+req.query.booktype+","+req.query.authername+","+req.query.bookname+"\n"+searchresult);
        }
        
    }).catch((err) => {
        console.log("Error in Search Book using Auther name or Book Name...."+{message:err.message});
    });
})

//Book Search by Author name or Book Name or Book Type
router.get('/booksearch',(req,res)=>{
    BookModel.find({$or:[{bookname:req.query.searchvar.toLowerCase()},{authername:req.query.searchvar.toLowerCase()},{booktype:req.query.searchvar.toLowerCase()}]})
    .then((searchresult) => {
        if(searchresult==0){
            res.send("search result for:"+req.query.searchvar+"\n Result Not Found\n Enter Correct Details");
        }
        else{
            res.send("search result for:"+req.query.searchvar+"\n"+searchresult);
        }
        
    }).catch((err) => {
        console.log("Error in Search Book using Auther name or Book Name...."+{message:err.message});
    });
})

//Book Update
router.put('/updatebook',(req,res)=>{
    let Bookobj={
        bookpage:req.body.bookpage,
        bookprice:req.body.bookprice,
        bookpublisher:req.body.bookpublisher
    }
    BookModel.find({$and:[{bookname:req.body.bookname.toLowerCase()},{authername:req.body.authername.toLowerCase()}]})
    .then((findresult) => {
        if(findresult.length==0){
            res.send("Book Not Found.\nPlease Provide Correct Author Name and Book Name");
        }
        else{
                BookModel.findOneAndUpdate({$and:[{bookname:req.body.bookname.toLowerCase()},{authername:req.body.authername.toLowerCase()}]},{$set:Bookobj},{new:true})
                .then((updateresult) => {
                    res.send(updateresult);
                }).catch((err) => {
                    console.log("Error in update book details...."+{message:err.message});
                });
        }
    }).catch((err) => {
        console.log("Error in update book details...."+{message:err.message});
    });
    
})

//Book Delete

router.delete('/deletebook',(req,res)=>{
    BookModel.findOneAndRemove({$and:[{booktype:req.query.booktype.toLowerCase()},{bookname:req.query.bookname.toLowerCase()},{authername:req.query.authername.toLowerCase()}]})
    .then((deleteresult) => {
        if(deleteresult==null){
            res.send("Book Not Found For Delete");
        }
        else{
        res.send("Book Deleted Successfully.\n"+deleteresult);}
    }).catch((err) => {
        console.log("Error in delete...."+{message:err.message});
    });
})

module.exports=router;