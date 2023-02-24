const bookService = require("../../services/bookServices/bookService.js");
//Importing from services/bookServices/bookService.js

async function createBookAPI(req, res) {
  res.send(await bookService.createBookService(req.body.book));
}

async function readBookAPI(req, res) {
  res.send(await bookService.readBookService());
}

async function readSingleParamsBookAPI(req, res) {
  res.send(
    await bookService.readSingleParamsBookService(req.params.authorOrGenre)
  );
}

async function readDoubleParamsBookAPI(req, res) {
  res.send(
    await bookService.readDoubleParamsBookService(
      req.params.authorOrGenre,
      req.params.genreOrAuthor
    )
  );
}

async function updateSingleParamsBookAPI(req, res) {
  res.send(
    await bookService.updateSingleParamsBookService(
      req.body.book,
      req.params.authorOrGenre
    )
  );
}

async function updateDoubleParamsBookAPI(req, res) {
  res.send(
    await bookService.updateDoubleParamsBookService(
      req.body.book,
      req.params.authorOrGenre,
      req.params.genreOrAuthor
    )
  );
}

async function deleteSingleParamsBookAPI(req, res) {
  res.send(
    await bookService.deleteSingleParamsBookService(req.params.authorOrGenre)
  );
}

async function deleteDoubleParamsBookAPI(req, res) {
  res.send(
    await bookService.deleteDoubleParamsBookService(
      req.params.authorOrGenre,
      req.params.genreOrAuthor
    )
  );
}

const bookControllerAPI = {
  createBookAPI: createBookAPI,

  readBookAPI: readBookAPI,
  readSingleParamsBookAPI: readSingleParamsBookAPI,
  readDoubleParamsBookAPI: readDoubleParamsBookAPI,

  updateSingleParamsBookAPI: updateSingleParamsBookAPI,
  updateDoubleParamsBookAPI: updateDoubleParamsBookAPI,

  deleteSingleParamsBookAPI: deleteSingleParamsBookAPI,
  deleteDoubleParamsBookAPI: deleteDoubleParamsBookAPI,
};

module.exports = bookControllerAPI;
//Exporting to routes/bookRoutes/bookRoute.js