const mongoose = require("mongoose")

const authorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// We need to export the schema like so
// We gibe a name to our model ( first parameter , second we bind it to the build schema)

module.exports = mongoose.model('Author', authorsSchema)