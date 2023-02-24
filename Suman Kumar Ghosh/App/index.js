require('dotenv').config();
const express=require("express");
var app=express();
const Port=process.env.Port
var bodyparser=require("body-parser");
app.use(bodyparser.json());

const connection=require("../Database/connection");

//import controller
const bookApi=require("../Controllers/bookApi")
app.use('/book',bookApi)


//Server running
app.listen(Port,()=>{
    console.log(`App is listening on ${Port}`);
})