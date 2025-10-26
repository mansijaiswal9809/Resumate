import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  role: { type: String },
  company: { type: String },
  start: { type: String },
  end: { type: String },
  description: { type: String },
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String },
  institute: { type: String },
  branch: { type: String },
  gpa: { type: String },
  start: { type: String },
});

const ResumeSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      required:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String },
    profession: { type: String },
    email: { type: String },
    summary: { type: String },
    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    skills: { type: [String], default: [] },
    secondaryColor: { type: String, default: "purple-500" },
    phone: { type: String },
    city: { type: String },
    linkedin: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);
