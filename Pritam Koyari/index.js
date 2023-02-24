

const express = require('express');

var app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const my_mongoose = require('./dbconnection.js');

const bookAPI = require('./controllers/bookAPI.js');
app.use('/book',bookAPI)

app.listen(5000, () => console.log('EXPRESS Server Started at Port No: 5000'));


