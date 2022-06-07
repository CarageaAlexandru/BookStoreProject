const mongoose = require("mongoose");

// Create the Schema for new Books
//
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  coverImageType: {
    type: String,
    required: true,
  },

  author: {
    // reference to author id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
    // ref needs to be the same with the model from the schema
  },
});

// Export the mongoose schema model
// 2 parameterrs ( The name of our table , and the second is the schema)

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString('base64')}`;
  }
});

module.exports = mongoose.model("Book", bookSchema);
