const express = require('express')
const router = express.Router()

//The route for all authors

router.get('/', (req, res) => {
    // use render to render the index.ejs file
    res.render('authors/index')
})

// Route for new authors only
router.get('/new', (req, res) => {
    res.render('authors/new')
})

// Create Author Route
router.post('/', (req, res) => {
    res.send('Create')
})
// export the file so it can be used in server.js
module.exports = router