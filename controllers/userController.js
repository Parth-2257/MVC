const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "../data/users.json");

// GET /users
const getUsers = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const users = JSON.parse(data);

    if (req.query.minAge) {
      const minAge = Number(req.query.minAge);

      const filteredUsers = users.filter(
        (user) => user.age >= minAge
      );

      return res.status(200).json(filteredUsers);
    }
// router --> controller --> service --> database 
    res.status(200).json(users);
  });
};

// GET /users/:id
const getUser = (req, res) => {
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
};

// POST /users
const addUser = (req, res) => {
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

    fs.writeFile(
      pathToFile,
      JSON.stringify(users, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        res.status(201).json(newUser);
      }
    );
  });
};

// PATCH /users/:id
const updateUser = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const users = JSON.parse(data);
    const id = Number(req.params.id);

    const index = users.findIndex(
      (user) => user.id === id
    );

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

    fs.writeFile(
      pathToFile,
      JSON.stringify(users, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Internal Server Error",
          });
        }

        res.status(200).json(updatedUser);
      }
    );
  });
};

// DELETE /users/:id
const deleteUser = (req, res) => {
  fs.readFile(pathToFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    const users = JSON.parse(data);
    const id = Number(req.params.id);

    const index = users.findIndex(
      (user) => user.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    users.splice(index, 1);

    fs.writeFile(
      pathToFile,
      JSON.stringify(users, null, 2),
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
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
};