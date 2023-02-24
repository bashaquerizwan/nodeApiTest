// IMPORT EXPRESS SERVER
const express = require('express');


// USE Router FOR EXPRESS SERVER
const router = express.Router();

//Import library model and Bind it
const Lib_Model = require('../models/library_schema');
// const Lib_Model=require(library_schema)


//API To Add books in MongoDB.
router.post('/Add_NewBook',(req, res) =>{
 
    const libobj = new Lib_Model({
    bookid:req.body.bookid,
    bookname : req.body.bookname,
    bookauthor : req.body.bookauthor.toUpperCase(),
    bookpublisher: req.body.bookpublisher,
    bookgenre:req.body.bookgenre.toLowerCase()
    });

    //To insert or save the Document
    libobj.save()
    .then(inserteddocument => {
      res.status(200).send('Book INSERED IN MONGODB DATABASE ' + '<br\>' + inserteddocument);
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
  });



//To Update bookname and publisher by ID
router.put('/updatebook', (req, res) => {
  Lib_Model.findOneAndUpdate({ "bookid": (req.query.bookid) },
    {
      $set: {
        "bookname": req.body.bookname,
        "bookpublisher": req.body.bookpublisher
      }
    }, { new: true })
    .then(getupdateddocument => {
      if (getupdateddocument != null)
        res.status(200).send('BOOK UPDATED ' + getupdateddocument);
      else
        res.status(404).send('INVALID BOOK ID , NO BOOKS IN THIS ID' + req.query.bookid);
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.query.bookid });
    }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION
); //CLOSE PUT METHOD



//DELETE A BOOK FROM DATABASE
router.delete('/delete', (req, res) => {
  Lib_Model.findOneAndRemove({ "bookid": (req.query.bookid) })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('BOOK DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID BOOK ID,NO BOOKS IN THIS ID ' + req.query.bookid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.query.bookid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
); //CLOSE Delete METHOD



//TO SEARCH BOOKS by AUTHOR
router.get('/search_byAuthor',(req,res) => {
  Lib_Model.find({"bookauthor":(req.query.bookauthor.toUpperCase())}) 
  .then(getalldocumentsfrommongodb => {
    if(getalldocumentsfrommongodb.length>0){
    res.status(200).send('BOOK AUTHOR FOUND!' + getalldocumentsfrommongodb);
    }
    else{
      res.status(404).send('Problem, There is no such Author ' + req.query.bookauthor);
     }
  })//Close THen
  .catch(err =>{
    return res.status(500).send({ message: "DB Problem..Error in Search with Author " + req.query.bookauthor });
  })
}
);



//TO Search books by Genre
router.get('/search_byGenre',(req,res) => {
  Lib_Model.find({"bookgenre":(req.query.bookgenre.toLowerCase())}) 
  .then(getalldocumentsfrommongodb => {
    if(getalldocumentsfrommongodb.length>0){
    res.status(200).send('BOOK AUTHOR FOUND!' + getalldocumentsfrommongodb);
    }
    else{
      res.status(404).send('Problem, There is no such Genre Books ' + req.query.bookgenre);
     }
  })//Close THen
  .catch(err =>{
    return res.status(500).send({ message: "DB Problem..Error in Search with Author " + req.query.bookgenre });
  })
}
);






//To View all MY BOOKS From DATABASE
router.get('/view_allbooks', (req, res) => {
  Lib_Model.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send('ALL BOOKS in LIBRARY ARE:-' + getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY    
);//CLOSE GET METHOD






module.exports = router;