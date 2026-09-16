// The main file whose code is shifted to different files 


const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(express.json());
const pathToFile = path.join(__dirname, "users.json");
const pathToFile2 = path.join(__dirname, "books.json");

// get all users or filtered
app.get("/users", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    // handles both /users and /users?minAge=20
    const users = JSON.parse(data);
    if (req.query.minAge) {
      const minAge = Number(req.query.minAge);
      const filteredUsers = users.filter((user) => user.age >= minAge);
      return res.status(200).json(filteredUsers);
    }
    res.status(200).json(users);
  });
});

// get 1 user
app.get("/users/:id", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    const users = JSON.parse(data);
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  });
});

// add a user
app.post("/users", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    const users = JSON.parse(data);
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      city: req.body.city,
    };
    users.push(newUser);

    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(201).json(newUser);
    });
  });
});

// update a user
app.patch("/users/:id", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const users = JSON.parse(data);

    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = {
      ...users[index],
      ...req.body,
    };

    users[index] = updatedUser;

    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(200).json(updatedUser);
    });
  });
});

// delete a user
app.delete("/users/:id", (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const users = JSON.parse(data);
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    users.splice(index, 1);
    fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
      res.status(204).send();
    });
  });
});

// get all books or filtered
app.get("/books", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    // handles /books?minPrice=400
    if (req.query.minPrice) {
      const minPrice = Number(req.query.minPrice);

      const filteredBooks = books.filter((book) => book.price >= minPrice);

      return res.status(200).json(filteredBooks);
    }

    res.status(200).json(books);
  });
});

// GET one book
// GET /books/2

app.get("/books/:id", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    const id = Number(req.params.id);

    const book = books.find((book) => book.id === id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  });
});

// POST - add a book
// POST /books

app.post("/books", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
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

    fs.writeFile(pathToFile2, JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(201).json(newBook);
    });
  });
});

// PATCH - update a book
// PATCH /books/2

app.patch("/books/:id", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    const id = Number(req.params.id);

    const index = books.findIndex((book) => book.id === id);

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

    fs.writeFile(pathToFile2, JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(200).json(updatedBook);
    });
  });
});

// DELETE a book
// DELETE /books/2
app.delete("/books/:id", (req, res) => {
  fs.readFile(pathToFile2, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const books = JSON.parse(data);

    const id = Number(req.params.id);

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    books.splice(index, 1);

    fs.writeFile(pathToFile2, JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      res.status(204).send();
    });
  });
});

// app.listen(3002);