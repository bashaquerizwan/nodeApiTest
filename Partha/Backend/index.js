const express=require('express');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const my_mongoose=require('./dbconnect_promise');

const libAPI=require('./controllers/libAPI');
app.use('/library',libAPI);

app.listen(3000,()=>{
    console.log("EXPRESS SERVER STARTED AT PORT NO 3000....")
});