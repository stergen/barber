const express = require("express");
const bodyParser = require("body-parser");

// create express app
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// connecting to the database
require("./server/server");

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome!!!" });
});

const port = 8080;

if (!module.parent) {
  // listen for requests
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

// Require Notes routes
require("./server/routes/user.js")(app);

module.exports = app; // for testing
