import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import resumeRouter from "./routers/resume.js";
import authRouter from "./routers/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // ← Add this to parse cookies

app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // required for cookies
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Routes
app.use("/api/resume", resumeRouter);
app.use("/api/auth", authRouter);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
