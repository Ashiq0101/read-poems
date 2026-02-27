import mongoose from "mongoose";

const poemSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // will store Base64 image string
      default: "",  // optional image
    },
  },
  { timestamps: true }
);

const Poem = mongoose.model("Poem", poemSchema);

export default Poem;