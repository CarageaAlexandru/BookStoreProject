const { path } = require("express/lib/application")
const mongoose = require("mongoose")

const coverImageBasePath = 'uploads/bookCovers'

// Create the Schema for new Books
// 
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        // reference to author id
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
        // ref needs to be the same with the model from the schema
    }
})

// Export the mongoose schema model 
// 2 parameterrs ( The name of our table , and the second is the schema)

bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageBasePath != null) {
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath