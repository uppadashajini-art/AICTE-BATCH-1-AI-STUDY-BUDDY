import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();

const app = express();

// ================================
// MIDDLEWARE
// ================================

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// ================================
// TEST ROUTE
// ================================

app.get("/", (req, res) => {
  res.send("API working");
});

// ================================
// ROUTES
// ================================

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/summary", summaryRoutes);

// ================================
// DATABASE
// ================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});