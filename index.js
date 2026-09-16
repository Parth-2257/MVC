const express = require("express");

const logger = require("./middleware/logger");

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.listen(3002, () => {
  console.log("Server running on port 3002");
});