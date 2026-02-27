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

// ✅ CORS Configuration for Vercel Frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local development
      "https://read-poems.vercel.app", // production frontend
    ],
    credentials: true,
  })
);

// 🚀 Increase body size limit for Base64 images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/* ===============================
   ROUTES
=================================*/

app.use("/api/poems", poemRoutes);

// Optional test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* ===============================
   SERVER START
=================================*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});