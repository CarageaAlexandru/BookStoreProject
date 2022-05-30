const express = require('express')
const router = express.Router()
// Import the author from models to pass it in the route
const Author = require('../models/author')

//The route for all authors

router.get('/', (req, res) => {
    // use render to render the index.ejs file
    res.render('authors/index')
})

// Route for new authors only
// We need to pass the schema from MODELS / AUTHOR
router.get('/new', (req, res) => {
    res.render('authors/new', { Author: new Author() })
    // Now we can create our form for new author in NEW.EJS
})

// Create Author Route
router.post('/', (req, res) => {
    res.send('Create')
})
// export the file so it can be used in server.js
module.exports = router