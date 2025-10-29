import React, { useEffect, useState } from "react";
import { X, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import ResumeCard from "./ResumeCard";
import ResumeCard2 from "./ResumeCard2";
import ResumeCard3 from "./ResumeCard3";

interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  description: string;
}

interface Education {
  degree: string;
  institute: string;
  branch: string;
  gpa: string;
  end: string;
}

interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

const MultiStepResumeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const totalSteps = 5;

  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("1");
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    profession: "",
    linkedin: "",
    website: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
  });

  // Fetch resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/resume/${id}`, {
          withCredentials: true,
        });
        setFormData((prev) => ({ ...prev, ...res.data }));
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load resume");
      }
    };
    if (id) fetchResume();
  }, [id]);

  // Save progress (PATCH)
  const handleNext = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/resume/${id}`, formData, {
        withCredentials: true,
      });
      toast.success("Progress saved!");
      setStep((prev) => Math.min(prev + 1, totalSteps));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save progress");
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  // Skill handlers
  const addSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const deleteExperience = (idx: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== idx),
    });
  };

  const deleteEducation = (idx: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== idx),
    });
  };

  const progress = (step / totalSteps) * 100;

  return (
    <section className="min-h-screen bg-gray-50 px-4 md:px-10 py-8 flex flex-col lg:flex-row gap-8">
      {/* ===== Left: Form Section ===== */}
      <div className="w-full lg:w-[42%] bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-y-auto">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>Step {step}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Template selector */}
        <div className="mb-6">
          <label
            htmlFor="template"
            className="block text-gray-700 font-semibold mb-2 text-center"
          >
            Select Resume Template
          </label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          >
            <option value="1">Classic</option>
            <option value="2">Modern 2-Column</option>
            <option value="3">Minimalist</option>
          </select>
        </div>

        {/* ===== Steps ===== */}
        <div className="space-y-6 grow">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  "fullName",
                  "email",
                  "phone",
                  "city",
                  "linkedin",
                  "website",
                  "profession",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={(formData as any)[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 rounded-lg p-3 w-full transition"
                  />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Professional Summary
              </h2>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Briefly describe your professional background..."
                className="w-full border border-gray-300 p-4 rounded-lg h-48 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
              {formData.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 p-4 rounded-lg shadow-sm space-y-3 relative"
                >
                  <button
                    onClick={() => deleteExperience(idx)}
                    className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                  {["company", "role", "start", "end"].map((key) => (
                    <input
                      key={key}
                      type="text"
                      placeholder={key}
                      value={(exp as any)[key]}
                      onChange={(e) => {
                        const updated = [...formData.experience];
                        updated[idx] = {
                          ...updated[idx],
                          [key]: e.target.value,
                        };
                        setFormData({ ...formData, experience: updated });
                      }}
                      className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                    />
                  ))}
                  <textarea
                    onChange={(e) => {
                      const updated = [...formData.experience];
                      updated[idx] = {
                        ...updated[idx],
                        description: e.target.value,
                      };
                      
                      setFormData({ ...formData, experience: updated });
                    }}
                    value={(exp as any)["description"]}
                    placeholder="Description"
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                  ></textarea>
                </div>
              ))}
              <button
                className="text-blue-600 mt-2 hover:underline font-medium"
                onClick={() =>
                  setFormData({
                    ...formData,
                    experience: [
                      ...formData.experience,
                      {
                        company: "",
                        role: "",
                        start: "",
                        end: "",
                        description: "",
                      },
                    ],
                  })
                }
              >
                + Add Experience
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
              {formData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 p-4 rounded-lg shadow-sm relative"
                >
                  <button
                    onClick={() => deleteEducation(idx)}
                    className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                  {["institute", "degree", "branch", "end", "gpa"].map(
                    (key) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={key}
                        value={(edu as any)[key]}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[idx] = {
                            ...updated[idx],
                            [key]: e.target.value,
                          };
                          setFormData({ ...formData, education: updated });
                        }}
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                      />
                    )
                  )}
                </div>
              ))}
              <button
                className="text-blue-600 mt-2 hover:underline font-medium"
                onClick={() =>
                  setFormData({
                    ...formData,
                    education: [
                      ...formData.education,
                      {
                        institute: "",
                        degree: "",
                        branch: "",
                        end: "",
                        gpa: "",
                      },
                    ],
                  })
                }
              >
                + Add Education
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {skill}
                    <X
                      size={16}
                      className="cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add skill"
                  className="border border-gray-300 rounded-lg flex-1 p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                />
                <button
                  onClick={addSkill}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t border-gray-200 mt-4 sticky bottom-0 bg-white pb-2">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
            >
              Previous
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ml-auto cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                handleNext();
                toast.success("Resume saved successfully!");
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ml-auto cursor-pointer"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* ===== Right: Resume Preview ===== */}
      {selectedTemplate === "1" && <ResumeCard {...formData} />}
      {selectedTemplate === "2" && <ResumeCard2 {...formData} />}
      {selectedTemplate === "3" && <ResumeCard3 {...formData} />}
    </section>
  );
};

export default MultiStepResumeForm;
