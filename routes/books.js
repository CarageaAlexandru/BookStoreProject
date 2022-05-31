const express = require("express");
const router = express.Router();
// Update all the routes for book model
const Book = require("../models/book");
const Author = require("../models/author")

//The route for all books

router.get("/", async (req, res) => {
  // Search Authors
  res.send("Receiving books")
});

// Route for new books only
router.get("/new", async (req, res) => {
  // Import book on top
  // We can pass here the variables that will be send to ejs
  try {
    const authors = await Author.find({})
    const book = new Book()
    res.render('books/new', {
      authors: authors,
      book: book
    })
  } catch (error) {
    res.redirect('/books')
  }
});

// Create Book Route

router.post("/", async (req, res) => {
  const book = new Book ({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  })

});
// export the file so it can be used in server.js
module.exports = router;
