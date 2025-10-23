import React, { useState } from "react";
import { User, Trash2, Edit2, X } from "lucide-react";

const resumes = [
  {
    name: "Mansi Jaiswal",
    email: "mansi.jaiswal@example.com",
    phone: "+61 412 345 678",
    place: "Sydney, Australia",
    linkedin: "linkedin.com/in/mansijaiswal",
    website: "mansijaiswal.dev",
    summary: "Full-Stack Developer passionate about building interactive web applications.",
    experience: ["Frontend Developer at Oxo Realty", "Virtual Lab Project at IIT"],
    achievements: ["Optimized property management workflows by 40%", "Increased user engagement by 30%"],
    skills: ["React.js", "Vue.js", "Node.js", "MongoDB", "PostgreSQL"]
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+61 423 987 654",
    place: "Melbourne, Australia",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev",
    summary: "Software Engineer with experience in building scalable web applications.",
    experience: ["Backend Developer at TechCorp", "Open-source contributor"],
    achievements: ["Implemented CI/CD pipelines reducing deployment time by 50%", "Led a team of 3 developers on major project"],
    skills: ["Node.js", "Express", "React.js", "Docker", "AWS"]
  }
];

const ResumeLandingPage: React.FC<{ userName?: string }> = ({ userName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");

  const handleCreateResume = () => {
    console.log("Creating resume with title:", resumeTitle);
    setIsModalOpen(false);
    setResumeTitle("");
  };

  return (
    <section className="bg-gray-50 min-h-screen px-6 md:px-12 py-16">
      {/* Landing Section */}
      <div className="flex flex-col items-center justify-center text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {userName ? `Hello, ${userName}` : "Welcome to ResuMate!"}
        </h1>
        <p className="text-gray-600 text-lg max-w-lg">
          Build a professional resume from scratch or upload an existing one to edit and improve it with AI-powered assistance.
        </p>

        <div className="flex flex-col md:flex-row gap-10 mt-12">
          {/* Create Resume */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition w-64 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Create Resume</h2>
            <p className="text-gray-500 text-center text-sm">Start from scratch with AI suggestions and professional templates.</p>
          </div>

          {/* Upload Resume */}
          <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition w-64 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3M12 4v6" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Upload Existing</h2>
            <p className="text-gray-500 text-center text-sm">Edit or enhance your existing resume quickly with AI-powered tools.</p>
          </div>
        </div>
      </div>

      {/* Resume Dashboard */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Resumes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume, idx) => (
            <div key={idx} className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer group">
              {/* Hover Actions */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 flex gap-2 transition">
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
                <button className="text-blue-600 hover:text-blue-700">
                  <Edit2 size={18} />
                </button>
              </div>

              {/* Name & Icon */}
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 justify-center">
                <User size={24} /> {resume.name}
              </h2>

              {/* Resume Details */}
              <div className="text-gray-600 text-sm space-y-2">
                <p><strong>Email:</strong> {resume.email}</p>
                <p><strong>Phone:</strong> {resume.phone}</p>
                <p><strong>Location:</strong> {resume.place}</p>
                <p><strong>LinkedIn:</strong> {resume.linkedin}</p>
                <p><strong>Website:</strong> {resume.website}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Resume Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#00000053] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Create a Resume</h2>
            <input
              type="text"
              placeholder="Enter resume title"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateResume}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Resume
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumeLandingPage;
