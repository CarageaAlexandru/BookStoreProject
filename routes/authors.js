const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//The route for all authors

router.get("/", async (req, res) => {
  // displaying the authors using async
  try {
    // we will try to display all authors
    const authors = await Author.find({});
    res.render("authors/index", { authors: authors});
  } catch {
    // if something wrong happens we will redirect the user to our homepage
    res.redirect('/')
  }
});

// Route for new authors only
router.get("/new", (req, res) => {
  // Import Author on top
  // We can pass here the variables that will be send to ejs
  res.render("authors/new", { author: new Author() });
});

// Create Author Route

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch {
    // now we can add names to our database
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});
// export the file so it can be used in server.js
module.exports = router;
