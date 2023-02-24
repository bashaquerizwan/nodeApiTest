const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
const mongoURL = process.env.MONGO_CONN;

async function dbconnect() {
    return mongoose.connect(mongoURL)
    .then(
        () => {
            return `Connected successfully with MongoDb '${process.env.DATABASE_NAME}'. `;
        }
    )
    .catch(
        (error) => {
            return "Error while connecting. Error details : " + error.message;
        }
    )
}

module.exports = dbconnect;
//Exporting to the server.js