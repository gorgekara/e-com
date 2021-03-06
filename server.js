const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

const books = require("./src/backend/routes/books");

mongoose
  .connect("mongodb://localhost/e-commerce", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Could not connect to MongoDB"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Request-With, Authorization, Origin, Accept, Content-Type"
    ),
    res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/books", books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));
