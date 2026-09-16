const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "../data/books.json");

// GET /books
const getBooks = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    if (req.query.minPrice) {
      const minPrice = Number(req.query.minPrice);

      const filteredBooks = books.filter(
        (book) => book.price >= minPrice
      );

      return res.status(200).json(filteredBooks);
    }

    res.status(200).json(books);
  });
};

// GET /books/:id
const getBook = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);
    const id = Number(req.params.id);

    const book = books.find(
      (book) => book.id === id
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  });
};

// POST /books
const addBook = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    const newBook = {
      id: books.length + 1,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      category: req.body.category,
      available: req.body.available,
    };

    books.push(newBook);

    fs.writeFile(
      pathToFile,
      JSON.stringify(books, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        res.status(201).json(newBook);
      }
    );
  });
};

// PATCH /books/:id
const updateBook = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);
    const id = Number(req.params.id);

    const index = books.findIndex(
      (book) => book.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const updatedBook = {
      ...books[index],
      ...req.body,
    };

    books[index] = updatedBook;

    fs.writeFile(
      pathToFile,
      JSON.stringify(books, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        res.status(200).json(updatedBook);
      }
    );
  });
};

// DELETE /books/:id
const deleteBook = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);
    const id = Number(req.params.id);

    const index = books.findIndex(
      (book) => book.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    books.splice(index, 1);

    fs.writeFile(
      pathToFile,
      JSON.stringify(books, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        res.status(204).send();
      }
    );
  });
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
};