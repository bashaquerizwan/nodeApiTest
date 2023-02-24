const express = require('express');
const router = express.Router();

const bookRoute = require('../routes/bookRoutes/bookRoute.js');
//Importing from routes/bookRoutes/bookRoute.js

router.use('/book', bookRoute);

module.exports = router;
//Exporting to app/index.js
