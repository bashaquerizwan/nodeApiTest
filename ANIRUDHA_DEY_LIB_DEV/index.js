const express=require('express');
//The express() syntax is the equivalent of saying new express(). 
//It creates a new instance of express that you can assign to a variable.
var app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.json());

const cors=require('cors');
app.use(cors());
const my_mongoose=require('./dbconnection');
// IMPORT bookAPI from scontrollers
const bookAPI=require('./controllers/bookAPI')
app.use('/book',bookAPI)
// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(5000,()=>{console.log("Express server started at port no. 5000")});