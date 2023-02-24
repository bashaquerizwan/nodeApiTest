const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const url='mongodb://localhost:27017/Library';

mongoose.connect(url)
.then(connect=>{
    console.log("NodeJs to MongoDB detabase connection established.");
})
.catch(error=>{
    console.log("Error in database connectivity."+JSON.stringify(error,undefined,2));
    process.exit();
})
module.exports=mongoose;