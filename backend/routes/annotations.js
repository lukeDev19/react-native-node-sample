const express = require("express");
const Annotation = require("../models/Annotation");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const annotation = new Annotation(req.body);
    await annotation.save();
    res.json(annotation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while saving the annotation" });
  }
});

router.get("/:bookId", async (req, res) => {
  try {
    const annotations = await Annotation.find({ bookId: req.params.bookId });
    res.json(annotations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching annotations" });
  }
});

module.exports = router;
