import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";
import protect from "../middleware/middleware.js";

const router = express.Router();

// Secret key (store in .env ideally)
const JWT_SECRET = "SECRET";

// Cookie options
const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ fullName, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Set HttpOnly cookie
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Set HttpOnly cookie
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// Get current user
router.get("/me", protect, async (req, res) => {
  res.status(200).json({ user: req.user });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
