const index = require('./index.js');
//Importing from app/index.js

const dbMongooseConnection = require('../config/dbconnection.js');
//Importing from config/dbconnection.js

const PORT = process.env.PORT || 5000;

dbMongooseConnection()
.then(
    (dbconnected) => {
        index.listen((PORT),() => {
            console.log(`Server is running on PORT : ${PORT}. `);
            console.log(dbconnected);
        });
    }
)
.catch(
    (error) => {
        console.log(error.message);
})