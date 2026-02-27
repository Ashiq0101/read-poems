import express from "express";
import Poem from "../models/poemModel.js";
import HomeImage from "../models/homeImageModel.js";
const router = express.Router();

// Add poem (with image support)
router.post("/", async (req, res) => {
  try {
    const { headline, content, image } = req.body;

    const poem = new Poem({
      headline,
      content,
      image
    });

    await poem.save();
    res.status(201).json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all poems
router.get("/", async (req, res) => {
  try {
    const poems = await Poem.find().sort({ createdAt: -1 });
    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete poem
router.delete("/:id", async (req, res) => {
  try {
    const poem = await Poem.findByIdAndDelete(req.params.id);
    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }
    res.json({ message: "Poem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save or Update homepage image
router.post("/home-image", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "No image received" });
    }

    console.log("Image received length:", image.length);

    let existing = await HomeImage.findOne();

    if (existing) {
      existing.image = image;
      await existing.save();
      return res.json(existing);
    }

    const newImage = new HomeImage({ image });
    await newImage.save();
    res.status(201).json(newImage);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get homepage image
router.get("/home-image", async (req, res) => {
  try {
    const image = await HomeImage.findOne();
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// UPDATE POEM
router.put("/:id", async (req, res) => {
  try {
    const { headline, content } = req.body;

    const updatedPoem = await Poem.findByIdAndUpdate(
      req.params.id,
      { headline, content },
      { new: true }
    );

    res.json(updatedPoem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update poem" });
  }
});

export default router;