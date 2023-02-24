const express = require('express');

const router = express.Router();

const BookModel = require('../models/book');

router.post('/registerbook', (req, res) => {

   
    const bookobj = new BookModel({
      "bookname": req.body.bookname,
      "authorname": req.body.authorname,
      "genresname": req.body.genresname,
      "booknumberofpages": req.body.booknumberofpages,
      "bookpublisher": req.body.bookpublisher,
      "bookprice": req.body.bookprice,
      "bookpublicationdate":req.body.bookpublicationdate,
    });
    bookobj.save()
      .then(inserteddocument => {
        res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + inserteddocument);
      })
      .catch(err => {
        res.status(500).send({ message: err.message || 'Error in Book Save ' })
      });
  }
  );

  router.get('/viewallbook', (req, res) => {
    BookModel.find()
      .then(data => {
        res.status(200).send(data);
      }) 
      .catch(err => {
        res.status(500).send({ message: err.message || 'Error in Fetch Book ' })
      });
  }  
  );
  router.get('/search/:authorname/:genresname', (req, res) => {
   
    BookModel.find({ $and: [ { "authorname":req.params.authorname}, {"genresname":req.params.genresname }] } )
      .then(getsearchdocument => {
        res.send(getsearchdocument);
      }) 
      .catch(err => {
        return res.status(500).send({ message: "DB Problem..Error in Retriving with authorname" + req.params.authorname });
      })
    }
  );
  
  
  
  router.delete('/remove/:authorname/:genresname', (req, res) => {
    BookModel.findOneAndRemove({ $and: [ { authorname:req.params.authorname}, {genresname:req.params.genresname }] } )
      .then(deleteddocument => {
        if (deleteddocument != null) {
          res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
        }
        else {
          res.status(404).send('INVALID AUTHOR NAME ' + req.params.authorname);
        }
      }) 
      .catch(err => {
        return res.status(500).send({ message: "DB Problem..Error in Delete with authorname " + req.params.authorname });
      })
    }
  ); 
  
  
  
  router.put('/update/:authorname/:genresname', (req, res) => {
 
    var bookobj = {
      bookprice: req.body.bookprice,
      booknumberofpages:req.body.booknumberofpages,
    };
    
    BookModel.findOneAndUpdate({ $and: [ { authorname:req.params.authorname}, {genresname:req.params.genresname }] },
      { $set: bookobj }, { new: true })
      .then(getupdateddocument => {
        if (getupdateddocument != null)
          res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
        else
          res.status(404).send('INVALID AUTHOR NAME ' + req.params.authorname);
      }) 
      .catch(err => {
        return res.status(500).send({ message: "DB Problem..Error in UPDATE with authorname " + req.params.authorname });
      }) 
  } 
  ); 
  

  module.exports = router;