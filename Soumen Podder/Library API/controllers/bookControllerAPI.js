const express = require('express');

const router = express.Router();

const crypto = require('crypto');//for generating random book id

const BookModel = require('../models/books_schema');


//BOOK REGISTER
router.post('/bookregister',(req,res)=>{
    BookModel.find({$and:[{"book_name":req.body.book_name},{"book_author":req.body.book_author},{"book_edition":req.body.book_edition}]})
    .then(findbook=>{
        console.log(findbook);
        if(findbook == 0)
        {
            const bookobj = new BookModel(
                {
                    book_id:crypto.randomBytes(4).toString('hex'),
                    book_name:req.body.book_name,
                    book_author:req.body.book_author,
                    book_publisher:req.body.book_publisher,
                    book_price:req.body.book_price,
                    book_genre:req.body.book_genre,
                    book_description:req.body.book_description,
                    book_edition:req.body.book_edition
                }
            );
        
            bookobj.save()
            .then(insertobj=>{
                res.status(201).send(insertobj);
            }).catch(err =>{
                res.status(500).send(err);
            })
        }
        else
          res.send("Book Is Already Exist");
    }) 
});

//BOOK SEARCH BY BOOK ID OR BOOK NAME
router.get('/booksearch/:searchtext',(req,res)=>{
    BookModel.find({$or:[{"book_name":req.params.searchtext},{"book_id":req.params.searchtext}]})
    .then(searchresult =>{
        console.log(searchresult);
        res.status(200).send(searchresult);
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'search faild'})
    });
});

//BOOK SEARCH BY BOOK AUTHOR AND BOOK GENRE
router.get('/booksearch/:bookauthor/:bookgenre',(req,res)=>{
    BookModel.find({$and:[{"book_author":req.params.bookauthor},{"book_genre":req.params.bookgenre}]})
    .then(searchresult =>{
        console.log(searchresult);
        res.status(200).send(searchresult);
    }).catch(err =>{
        res.status(500).send({ message: err.message || 'search faild'})
    });
});

//BOOK UPDATE BY GENRE AND AUTHOR
router.put('/bookupdate/:bookgenre/:bookauthor',(req,res)=>{
    BookModel.updateMany({$and:[{"book_genre":req.params.bookgenre},{"book_author":req.params.bookauthor}]},{
       $set:{
            "book_price":req.body.book_price,
            "book_description":req.body.book_description,
       } 
    },{new: true}).then(updateresult =>{
        console.log(updateresult);
        if(updateresult != null)
            res.status(201).send(updateresult);
    }).catch(err =>{
        res.status(500).send(err||{ message: "DB Problem..Error in UPDATE" });
    });
});

//BOOK UPDATE BY BOOK NAME OR BOOK ID
router.put('/bookupdate/:bookupdate',(req,res)=>{
    BookModel.updateMany({$or:[{"book_name":req.params.bookupdate},{"book_id":req.params.bookupdate}]},{
       $set:{
            "book_price":req.body.book_price,
            "book_description":req.body.book_description,
       } 
    },{new: true}).then(updateresult =>{
        console.log(updateresult);
        if(updateresult != null)
            res.status(201).send(updateresult);
    }).catch(err =>{
        res.status(500).send(err||{ message: "DB Problem..Error in UPDATE" });
    });
});

//BOOK DELETE BY BOOK ID OR BOOK NAME OR BOOK AUTHOR OR BOOK GENRE
router.delete('/bookdelete/:delete',(req,res)=>{
    BookModel.deleteMany({$or:[{"book_id":req.params.delete},{"book_name":req.params.delete},{"book_author":req.params.delete},{"book_genre":req.params.delete}]})
    .then(result =>{
        res.status(200).send(result);
    }).catch(err =>{
        res.status(500).send({ message: "error in book delete " })
    });
});

//BOOK DELETE BY BOOK GENRE AND BOOK AUTHOR
router.delete('/bookdelete/:bookgenre/:bookauthor',(req,res)=>{
    BookModel.deleteMany({$and:[{"book_author":req.params.bookauthor},{"book_genre":req.params.bookgenre}]})
    .then(result =>{
        res.status(200).send(result);
    }).catch(err =>{
        res.status(500).send({ message: "error in book delete " })
    });
});

module.exports = router;