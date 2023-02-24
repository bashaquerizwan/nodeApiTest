const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Pritam';

mongoose.set('strictQuery',false);
mongoose.connect(url)
      .then( () => 
             {
               console.log('NODEJS TO MongoDB Connection ESTABLISH.....');
             })
      .catch( err => 
              {
               console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
               process.exit();
              }); 

module.exports = mongoose;