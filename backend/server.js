import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import poemRoutes from "./routes/poemRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ===============================
   MIDDLEWARE
=================================*/

// Allow cross-origin requests
app.use(cors());

// 🚀 VERY IMPORTANT — Increase body size limit for Base64 images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/* ===============================
   ROUTES
=================================*/

app.use("/api/poems", poemRoutes);

/* ===============================
   SERVER START
=================================*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});