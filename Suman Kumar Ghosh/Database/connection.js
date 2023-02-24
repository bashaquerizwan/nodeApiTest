const mongoose=require("mongoose");
mongoose.set("strictQuery",true)
const url=process.env.DatabaseUrl


mongoose.connect(url)
.then(connect=>{
    console.log("Database Connection Done");
})
.catch(error=>{
    console.log(JSON.stringify(error,undefined))
})
module.exports=mongoose
