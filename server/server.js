import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"; // ✅ IMPORTANT ADD

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes); // ✅ THIS FIXES YOUR 404

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));