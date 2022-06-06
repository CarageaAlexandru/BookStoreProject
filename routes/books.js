const express = require("express");
const router = express.Router();
// Update all the routes for book model
const Book = require("../models/book");
const Author = require("../models/author");
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//The route for all books

router.get("/", async (req, res) => {
  // same like authors route we can implement for books

  let query = Book.find()
  if (req.query.title != null && req.query.title != "") {
    booksQuery = query.regex("title", new RegExp(req.query.title, 'i'))
  }


  // Search Books
  try {
    const books = await query.exec()
    res.render("books/index", {
      books: books,
      searchOptions: req.query
    })
  } catch  {
    res.redirect('/')
  }
});

// Route for new books only
router.get("/new", async (req, res) => {
  // Import book on top
  // We can pass here the variables that will be send to ejs
  renderNewPage(res, new Book())
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
  saveCover(book, req.body.cover)

  try {
    const newBook = await book.save()
    res.redirect(`books`)
    
  } catch {
    renderNewPage(res, book, true)
  }
})

// rendering page function
async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {  
      authors: authors,
      book: book
    }
    if ( hasError ) params.errorMessage = 'Error Creating Book'
    res.render('books/new', params)
  } catch {
    res.redirect('/books')
  }
}
function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}

// export the file so it can be used in server.js
module.exports = router;
