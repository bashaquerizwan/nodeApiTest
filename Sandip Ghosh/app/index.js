require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");

const route = require("./routes");
//Importing from app/routes.js

const app = express();

app.use(bodyParser.json());

app.use("/", route);

module.exports = app;
//Exporting to app/server.js