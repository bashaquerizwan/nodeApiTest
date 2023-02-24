const express = require("express");
const router = express.Router();

const bookControllerAPI = require("../../controllers/bookControllers/bookController.js");
//Importing from controllers/bookControllers/bookController.js

router.post("/create", bookControllerAPI.createBookAPI);

router.get("/read", bookControllerAPI.readBookAPI);
router.get("/read/:authorOrGenre", bookControllerAPI.readSingleParamsBookAPI);
router.get(
  "/read/:authorOrGenre/:genreOrAuthor",
  bookControllerAPI.readDoubleParamsBookAPI
);

router.patch(
  "/update/:authorOrGenre",
  bookControllerAPI.updateSingleParamsBookAPI
);
router.patch(
  "/update/:authorOrGenre/:genreOrAuthor",
  bookControllerAPI.updateDoubleParamsBookAPI
);

router.delete(
  "/delete/:authorOrGenre",
  bookControllerAPI.deleteSingleParamsBookAPI
);
router.delete(
  "/delete/:authorOrGenre/:genreOrAuthor",
  bookControllerAPI.deleteDoubleParamsBookAPI
);

module.exports = router;
//Exporting to app/routes.js
