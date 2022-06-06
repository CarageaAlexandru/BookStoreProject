const express = require('express')
const router = express.Router()
const Book = require('../models/book')

//the root route with a basic response
router.get('/', async (req, res) => {
    let books = []
    // showing all books

    // later on show implement only showing first 5
    try {
        books = await Book.find().limit(5).exec()
    } catch {
        books = []
    }

    // use render to render the index.ejs file
    res.render('index', { books: books })
})


// export the file so it can be used in server.js
module.exports = router