const express = require("express");
const router = express.Router();
// Update all the routes for book model
const Book = require("../models/book");

//The route for all books

router.get("/", async (req, res) => {
  // Search Authors
  res.send("Receiving")
});

// Route for new books only
router.get("/new", (req, res) => {
  // Import book on top
  // We can pass here the variables that will be send to ejs
  res.send("Receiving new books")
});

// Create Book Route

router.post("/", async (req, res) => {

});
// export the file so it can be used in server.js
module.exports = router;
