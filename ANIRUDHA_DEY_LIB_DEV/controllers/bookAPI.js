// IMPORT EXPRESS SERVER
const express=require('express');
// USE Router FOR EXPRESS SERVER
const router=express.Router();
//IMPORT BOOK MODEL AND BIND IT
const bookModel=require('../models/book');

// post is used to INSERT DOCUMENT/RECORD(CREATE OPERATION)
router.post('/addbook',(req,res)=>{

    //Create Object of BOOK Model Class
  // And Receive value from request body and Store value within the Object
    const bookObj=new bookModel({
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        genresName: req.body.genresName,
        bookPrice: req.body.bookPrice,
        bookPublisher:req.body.bookPublisher,
        bookPublicationDate:req.body.bookPublicationDate,
        bookLang:req.body.bookLang,
        bookDescription:req.body.bookDescription,
    })
    //INSERT/SAVE THE RECORD/DOCUMENT
    bookObj.save()
        .then((addbook) => {
                res.send([addbook]);
            }).catch((err) => {
                console.log({message:err.message});
        });
})



// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB(READ OPERATION)
router.get('/searchbook/:inputValue',(req,res)=>{
    bookModel.find({$or:[{authorName:req.params.inputValue},{genresName:req.params.inputValue},{bookName:req.params.inputValue}]})
        .then((result) => {
            if(result.length>0){
                res.send(result);
            }
            else{
                res.send({message:"No book Found"});
            }
        }).catch((err) => {
            console.log({message:err.message});
        });
})

//get IS USED FOR FETCHING DOCUMENTS FROM MONGODB(READ OPERATION)
router.get('/searchbook/:firstInput/:secondInput',(req,res)=>{
    bookModel.find({$and:[{$or:[{authorName:req.params.firstInput},{genresName:req.params.firstInput}]},
        {$or:[{authorName:req.params.secondInput},{genresName:req.params.secondInput}]}]})
        .then((result) => {
            if(result.length>0){
                res.send(result);
            }
            else{
                res.send([]);
            }
        }).catch((err) => {
            console.log({message:err.message});
        });
})

//UPDATE DOCUMENT IN MONGODB(UPDATE OPERATION)
router.put('/updatebook/:updatedValue',(req,res)=>{
    let bookObj={
        bookPrice: req.body.bookPrice,
        bookPublisher: req.body.bookPublisher,
        bookLang:req.body.bookLang,
        bookNoOfPage:req.body.bookNoOfPage,
        bookDescription:req.body.bookDescription,

    }
    bookModel.updateMany({$or:[{authorName:req.params.updatedValue},{genresName:req.params.updatedValue}]},{$set:bookObj},{new:true})
        .then((updatedResult) =>{
            if(updatedResult.modifiedCount==0){
                res.send("No data found")
            }
            else{
                res.send({message:"Updated Successfully"})
            }
        }).catch((err) => {
            console.log({message:err.message});
        });
})

//UPDATE DOCUMENT IN MONGODB(UPDATE OPERATION)
router.put('/updatebook/:firstUpdValue/:secondUpdValue',(req,res)=>{
    let bookObj={
        bookPrice: req.body.bookPrice,
        bookPublisher: req.body.bookPublisher,
        bookLang:req.body.bookLang,
        bookNoOfPage:req.body.bookNoOfPage,
        bookDescription:req.body.bookDescription,

    }
    bookModel.updateMany({$and:[{$or:[{authorName:req.params.firstUpdValue},{genresName:req.params.firstUpdValue}]},
        {$or:[{authorName:req.params.secondUpdValue},{genresName:req.params.secondUpdValue}]}]},{$set:bookObj},{new:true})
        .then((updatedResult) =>{
            if(updatedResult.modifiedCount==0){
                res.send("No data found")
            }
            else{
                res.send({message:"Updated Successfully"})
            }
        }).catch((err) => {
            console.log({message:err.message});
        });
})


//DELETE A DOCUMENT FROM MONGODB(DELETE OPERATION)
router.delete('/delete/:deletedValue',(req,res)=>{
    bookModel.deleteMany({$or:[{authorName:req.params.deletedValue},{genresName:req.params.deletedValue}]})
        .then((deletedResult) => {
            if(deletedResult.deletedCount==0){
                res.send("No data found")
            }
            else{
                res.send([{message:"Deleted Successfully"}])
            }
        }).catch((err) => {
            console.log({message:err.message});
        });
})

//DELETE A DOCUMENT FROM MONGODB(DELETE OPERATION)
router.delete('/delete/:firstDelValue/:secondDelValue',(req,res)=>{
    bookModel.deleteMany({$and:[{$or:[{authorName:req.params.firstDelValue},{genresName:req.params.firstDelValue}]},
        {$or:[{authorName:req.params.secondDelValue},{genresName:req.params.secondDelValue}]}]})
        .then((deleteResult) => {
            
            if(deleteResult.deletedCount==0){
                res.send("No data found")
            }
            else{
                res.send({message:"Deleted Successfully"})
            }
        }).catch((err) => {
            console.log({message:err.message});
        });
})



//SHOULD BE EXPORTED
module.exports=router;

