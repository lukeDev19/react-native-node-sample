const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const results = await Book.find({ $text: { $search: query } });
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for books" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the book" });
  }
});

module.exports = router;
