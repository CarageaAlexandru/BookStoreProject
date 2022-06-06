const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
// Import the author from models to pass it in the route
const Author = require("../models/author");

//The route for all authors

router.get("/", async (req, res) => {
  // empty object to populate search so we can associate the values
  let searchOptions = {};

  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// Route for new authors only
// We need to pass the schema from MODELS / AUTHOR
router.get("/new", (req, res) => {
  res.render("authors/new", { Author: new Author() });
  // Now we can create our form for new author in NEW.EJS
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});
// export the file so it can be used in server.js
module.exports = router;
