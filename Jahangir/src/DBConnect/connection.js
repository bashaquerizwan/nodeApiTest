const mongoose = require("mongoose");

// Database connection 
// It is basically returns promise (Connection is sucessfull or Connectioon is denied)
// mongodb://localhost:27017/library-api -> Database name.
mongoose.connect("mongodb://localhost:27017/library",{

}).then(() => {
    console.log('Connection is sucessful');
}).catch((e) => {
    console.log("No Connection");
})
