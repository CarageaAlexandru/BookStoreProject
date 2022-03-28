const express = require('express')
const router = express.Router()

//the root route with a basic response
router.get('/', (req, res) => {
    // use render to render the index.ejs file
    res.render('index')
})


// export the file so it can be used in server.js
module.exports = router