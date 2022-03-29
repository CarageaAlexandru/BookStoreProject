const mongoose = require("mongoose")

// Create the Schema for new Authors

const authorSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    }
})

// Export the mongoose schema model 
// 2 parameterrs ( The name of our table , and the second is the schema)

module.exports = mongoose.model('Author', authorSchema)