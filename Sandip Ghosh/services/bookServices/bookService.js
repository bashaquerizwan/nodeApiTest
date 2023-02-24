const bookSchema = require("../../models/bookModels/bookModel.js");
//Importing from models/bookModels/bookModel.js

async function createBookService(book) {
  var bookSchemaObject = new bookSchema({
    bookName: book.bookName,
    bookAuthor: book.bookAuthor,
    bookGenre: book.bookGenre,
    bookNumberOfPages: book.bookNumberOfPages,
    bookPrice: book.bookPrice,
    bookPublisher: book.bookPublisher,
  });

  return await bookSchemaObject
    .save()
    .then((insertedBook) => {
      return { message: "Book inserted successfully" };
    })
    .catch((error) => {
      return error.message;
    });
}

async function readBookService() {
  return await bookSchema
    .find({})
    .then((allBooks) => {
      if (allBooks.length == 0) {
        return { message: "No Books in the Library." };
      } else {
        return allBooks;
      }
    })
    .catch((error) => {
      return error.message;
    });
}

async function readSingleParamsBookService(authorOrGenre) {
  return await bookSchema
    .find({
      $or: [
        { bookAuthor: authorOrGenre },
        { bookGenre: authorOrGenre },
        { bookName: authorOrGenre },
      ],
    })
    .then((foundBook) => {
      if (foundBook.length == 0) {
        return { message: "No book found" };
      } else {
        return foundBook;
      }
    })
    .catch((error) => {
      return error.message;
    });
}

async function readDoubleParamsBookService(authorOrGenre, genreOrAuthor) {
  return await bookSchema
    .find({
      $and: [
        { $or: [{ bookAuthor: authorOrGenre }, { bookGenre: authorOrGenre }] },
        { $or: [{ bookAuthor: genreOrAuthor }, { bookGenre: genreOrAuthor }] },
      ],
    })
    .then((foundBook) => {
      if (foundBook.length == 0) {
        return { message: "No book found" };
      } else {
        return foundBook;
      }
    })
    .catch((error) => {
      return error.message;
    });
}

async function updateSingleParamsBookService(book, authorOrGenre) {
  return await bookSchema
    .updateMany(
      {
        $or: [{ bookAuthor: authorOrGenre }, { bookGenre: authorOrGenre }],
      },
      {
        bookName: book.bookName,
        bookPrice: book.bookPrice,
        bookNumberOfPages: book.bookNumberOfPages,
        bookPublisher: book.bookPublisher,
      },
      {
        new: true,
      }
    )
    .then((updatedBooks) => {
      if (updatedBooks.modifiedCount == 0) {
        return { message: "No book found" };
      } else {
        return { "Number of Books Modified": updatedBooks.modifiedCount };
      }
    })
    .catch((error) => {
      return error.message;
    });
}

async function updateDoubleParamsBookService(
  book,
  authorOrGenre,
  genreOrAuthor
) {
  return await bookSchema
    .updateMany(
      {
        $and: [
          {
            $or: [{ bookAuthor: authorOrGenre }, { bookGenre: authorOrGenre }],
          },
          {
            $or: [{ bookAuthor: genreOrAuthor }, { bookGenre: genreOrAuthor }],
          },
        ],
      },
      {
        bookPrice: book.bookPrice,
        bookNumberOfPages: book.bookNumberOfPages,
        bookPublisher: book.bookPublisher,
      },
      {
        new: true,
      }
    )
    .then((updatedBooks) => {
      if (updatedBooks.modifiedCount == 0) {
        return { message: "No book found" };
      } else {
        return { "Number of Books Modified": updatedBooks.modifiedCount };
      }
    })
    .catch((error) => {
      return error.message;
    });
}

async function deleteSingleParamsBookService(authorOrGenre) {
  return await bookSchema
    .deleteMany({
      $or: [{ bookAuthor: authorOrGenre }, { bookGenre: authorOrGenre }],
    })
    .then((deletedBook) => {
      if (deletedBook.deletedCount == 0) {
        return { message: "No book found." };
      } else {
        return { "Number of Books Deleted": deletedBook.deletedCount };
      }
    })
    .catch((error) => {
      return error.message;
    });
}

async function deleteDoubleParamsBookService(authorOrGenre, genreOrAuthor) {
  return await bookSchema
    .deleteMany({
      $and: [
        { $or: [{ bookAuthor: authorOrGenre }, { bookGenre: authorOrGenre }] },
        { $or: [{ bookAuthor: genreOrAuthor }, { bookGenre: genreOrAuthor }] },
      ],
    })
    .then((deletedBook) => {
      if (deletedBook.deletedCount == 0) {
        return { message: "No book found" };
      } else {
        return { "Number of Books Deleted": deletedBook.deletedCount };
      }
    })
    .catch((error) => {
      return error.message;
    });
}

const bookService = {
  createBookService: createBookService,

  readBookService: readBookService,
  readSingleParamsBookService: readSingleParamsBookService,
  readDoubleParamsBookService: readDoubleParamsBookService,

  updateSingleParamsBookService: updateSingleParamsBookService,
  updateDoubleParamsBookService: updateDoubleParamsBookService,

  deleteSingleParamsBookService: deleteSingleParamsBookService,
  deleteDoubleParamsBookService: deleteDoubleParamsBookService,
};

module.exports = bookService;
//Exporting to controllers/bookControllers/bookController.js
