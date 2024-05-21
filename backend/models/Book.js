const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  pages: [
    {
      pageNumber: Number,
      content: String,
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
