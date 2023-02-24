//IMPORT MONGOOSE PACKAGE
const mongoose=require('mongoose');

// Database Connection URL
const url='mongodb://localhost:27017/Library'
mongoose.set('strictQuery',false);

//ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
mongoose.connect(url)
   .then((result)=>{
    console.log('Nodejs to MongoDB Connection Establish')

   }).catch((err) => {
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
           process.exit();
});

//EXPORT MODULE mongoose because we need it in other JS file
module.exports=mongoose;
