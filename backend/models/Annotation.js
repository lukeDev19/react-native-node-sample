const mongoose = require("mongoose");

const annotationSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  pageNumber: Number,
  text: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const Annotation = mongoose.model("Annotation", annotationSchema);

module.exports = Annotation;
