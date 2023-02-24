const express=require('express');
var app=express();

var bodyparser=require("body-parser");
app.use(bodyparser.json());


const database_connection=require('./database_connection');

const bookcontroller = require('./controllers/bookControllerAPI');
app.use('/book',bookcontroller);

app.listen(5000,()=>{
    console.log('App is running on port number 5000.');
})