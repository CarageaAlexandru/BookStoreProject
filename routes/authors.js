const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Book = require("../models/book")
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
  res.render("authors/new", { author: new Author() });
  // Now we can create our form for new author in NEW.EJS
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

// READ

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: author.id }).limit(5).exec();
    res.render("authors/showAuthors", {
      author: author,
      booksByAuthor: books,
    });
  } catch (error) {
      console.log(error)
    res.redirect("/");
  }
});

// define Update methods
router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch (error) {
    res.redirect("/authors");
  }
});

// UPDATE ROUTE
router.put("/:id", async (req, res) => {
  let author;
  try {
    //   accessing the author by id
    author = await Author.findById(req.params.id);
    author.name = req.body.name;

    await author.save();

    res.redirect(`/authors/${author.id}`);
  } catch {
    //
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("authors/edit", {
        author: author,
        errorMessage: "Error updating the  Author",
      });
    }
  }
});

// DELETE ROUTE
router.delete("/:id", async (req, res) => {
  let author;
  try {
    //   accessing the author by id
    author = await Author.findById(req.params.id);

    await author.remove();
    // if the delete is successful we redirect to authors page
    res.redirect("/authors");
  } catch {
    //
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

// export the file so it can be used in server.js
module.exports = router;
