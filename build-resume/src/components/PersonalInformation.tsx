import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import ResumeCard from "./Resumecard";
import ResumeCard2 from "./ResumeCard2";
import ResumeCard3 from "./Resumecard3";
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

const MultiStepResumeForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("1");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills((prev) => [...prev, skillInput]);
      setSkillInput("");
    }
};

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const deleteExperience = (idx: number) => {
    setExperience(experience.filter((_, i) => i !== idx));
  };

  const deleteEducation = (idx: number) => {
    setEducation(education.filter((_, i) => i !== idx));
  };

  const progress = (step / totalSteps) * 100;

  return (
    <section className="min-h-screen bg-gray-50 px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <div className="w-[40%] bg-white p-8 rounded-xl shadow-md space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-blue-600 h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
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
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 transition"
        >
          <option value="1">Classic</option>
          <option value="2">2 Column</option>
          <option value="3">Extra</option>
        </select>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="url"
                placeholder="LinkedIn Profile"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="url"
                placeholder="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="border p-2 rounded-lg"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Professional Summary</h2>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Add your professional summary here"
              className="w-full border p-4 rounded-lg h-48"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Experience</h2>
            {experience.length > 0 &&
              experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="border p-4 rounded-lg space-y-2 relative"
                >
                  <button
                    onClick={() => deleteExperience(idx)}
                    className="absolute top-2 right-2 cursor-pointer bg-gray-100 p-2 rounded-full  text-red-500 hover:text-red-700"
                    title="Delete Experience"
                  >
                    <Trash2 size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[idx].company = e.target.value;
                      setExperience(newExp);
                    }}
                    className="border p-2 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[idx].role = e.target.value;
                      setExperience(newExp);
                    }}
                    className="border p-2 rounded-lg w-full"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.start}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[idx].start = e.target.value;
                      setExperience(newExp);
                    }}
                    className="border p-2 rounded-lg w-full"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.end}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[idx].end = e.target.value;
                      setExperience(newExp);
                    }}
                    className="border p-2 rounded-lg w-full"
                  />
                  <textarea
                    placeholder="Job Description"
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[idx].description = e.target.value;
                      setExperience(newExp);
                    }}
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              ))}
            <button
              className="text-blue-600 mt-2 cursor-pointer"
              onClick={() =>
                setExperience([
                  ...experience,
                  {
                    company: "",
                    role: "",
                    start: "",
                    end: "",
                    description: "",
                  },
                ])
              }
            >
              + Add Experience
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Education</h2>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="border p-4 rounded-lg space-y-2 relative"
              >
                <button
                  onClick={() => deleteEducation(idx)}
                  className="absolute top-2 cursor-pointer right-2 text-red-500 hover:text-red-700"
                  title="Delete Education"
                >
                  <Trash2 size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Institute"
                  value={edu.institute}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[idx].institute = e.target.value;
                    setEducation(newEdu);
                  }}
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[idx].degree = e.target.value;
                    setEducation(newEdu);
                  }}
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Branch"
                  value={edu.branch}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[idx].branch = e.target.value;
                    setEducation(newEdu);
                  }}
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={edu.end}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[idx].end = e.target.value;
                    setEducation(newEdu);
                  }}
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="GPA"
                  value={edu.gpa}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[idx].gpa = e.target.value;
                    setEducation(newEdu);
                  }}
                  className="border p-2 rounded-lg w-full"
                />
              </div>
            ))}
            <button
              className="text-blue-600 mt-2 cursor-pointer"
              onClick={() =>
                setEducation([
                  ...education,
                  { institute: "", degree: "", branch: "", end: "", gpa: "" },
                ])
              }
            >
              + Add Education
            </button>
          </div>
        )}

        {/* Step 5: Skills */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Skills</h2>
            <div className="flex gap-2 flex-wrap">
              {skills.map((skill) => (
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
                className="border p-2 rounded-lg flex-1"
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="bg-gray-300 px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-400 transition"
            >
              Previous
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={nextStep}
              className="bg-blue-600 text-white cursor-pointer  px-6 py-2 rounded-lg hover:bg-blue-700 transition ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => alert("Resume Saved!")}
              className="bg-green-600 text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-green-700 transition ml-auto"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Resume Preview Side Panel */}

      { selectedTemplate=="1" &&<ResumeCard 
        fullName={fullName}
        profession={profession}
        email={email}
        summary={summary}
        experience={experience}
        education={education}
        skills={skills}
        secondaryColor="purple-500"
        phone={phone}
        city={location}
        linkedin={linkedin}
        website={website}
      />}
      {selectedTemplate=="2" && <ResumeCard2
        fullName={fullName}
        profession={profession}
        email={email}
        summary={summary}
        experience={experience}
        education={education}
        skills={skills}
        secondaryColor="purple-500"
        phone={phone}
        city={location}
        linkedin={linkedin}
        website={website}
      />}
      {selectedTemplate=="3" && <ResumeCard3
        fullName={fullName}
        profession={profession}
        email={email}
        summary={summary}
        experience={experience}
        education={education}
        skills={skills}
        secondaryColor="purple-500"
        phone={phone}
        city={location}
        linkedin={linkedin}
        website={website}
      />}
    </section>
  );
};

export default MultiStepResumeForm;
