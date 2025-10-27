import express from "express";
import Resume from "../models/resume.js";
import protect from "../middleware/middleware.js";

// Create a new resume
const router = express.Router();
router.post("/", protect, async (req, res) => {
  try {
    const data = { title: req.body.title, userId: req.user._id };
    // console.log(data)
    const newResume = new Resume(data);
    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating resume", error: err.message });
  }
});

router.patch("/:id", protect, async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.body,id)
    const resume = await Resume.findById({ _id: id });
    const updatedresume = await Resume.updateOne({ _id: id }, { ...req.body });
    console.log(updatedresume);
    res.status(200).json(updatedresume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating resume", error: error.message });
  }
});

// Get all resumes
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(userId)
    const resumes = await Resume.find({ userId }); // filter by user I
    res.status(200).json(resumes);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching resumes", error: err.message });
  }
});

// Get a resume by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (err) {
    // console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching resume", error: err.message });
  }
});
router.delete("/:id", protect, async (req,res) => {
  try {
    await Resume.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Your Resume deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting resume", error: error.message });
  }
});

export default router;
