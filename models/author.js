const mongoose = require("mongoose")
const Book = require("./book")

const authorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// We need to export the schema like so
// We gibe a name to our model ( first parameter , second we bind it to the build schema)
// if the author have any books asociated cannot be deleted
authorsSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
        if(err) {
            next(err)
        } else if (books.length > 0 ) {
            next( new Error("this author still have books"))
            
        } else {
            next()
        }
    })
})


module.exports = mongoose.model('Author', authorsSchema)