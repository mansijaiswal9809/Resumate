import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

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
  branch?: string;
  gpa?: string;
  start?: string;
}

interface ResumeCardProps {
  title: string;
  _id: string;
  userId: string;
  fullName?: string;
  profession?: string;
  email?: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  secondaryColor?: string; // tailwind color suffix e.g. "purple-500"
  className?: string;
  phone?: string;
  city?: string;
  linkedin?: string;
  website?: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  city,
  fullName,
  phone,
  linkedin,
  website,
  profession,
  email,
  summary,
  experience = [],
  education = [],
  skills = [],
  secondaryColor = "purple-500",
  className = "",
}) => {
//   const accent = `bg-${secondaryColor}`;
  const textAccent = `text-${secondaryColor}`;

  return (
    <div
      className={`hidden lg:flex flex-1 flex-col text-[15px] leading-relaxed bg-white rounded-2xl shadow-2xl overflow-hidden transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] ${className}`}
    >

      {/* Name + Contact */}
      <div className="mt-16 text-center px-6 pb-6 border-b border-gray-200">
        <h2 className={`text-4xl font-bold tracking-tight ${textAccent}`}>
          {fullName}
        </h2>
        {profession && (
          <p className="text-gray-700 text-xl mt-1 font-medium">{profession}</p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-3 text-gray-500 text-sm">
          {email && (
            <div className="flex items-center gap-1">
              <Mail size={16} /> {email}
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1">
              <Phone size={16} /> {phone}
            </div>
          )}
          {city && (
            <div className="flex items-center gap-1">
              <MapPin size={16} /> {city}
            </div>
          )}
          {linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin size={16} />{" "}
              <a href={linkedin} className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-1">
              <Globe size={16} />{" "}
              <a href={website} className="hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6 space-y-6">
        {/* Summary */}
        {summary && (
          <section>
            <h3 className={`text-xl font-semibold mb-2 ${textAccent}`}>
              Summary
            </h3>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h3 className={`text-xl font-semibold mb-2 ${textAccent}`}>
              Experience
            </h3>
            <div className="space-y-3">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-gray-200 pl-4 hover:border-gray-400 transition"
                >
                  <p className="font-medium">
                    {exp.role} <span className="text-gray-500">@ {exp.company}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    {exp.start} – {exp.end}
                  </p>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 className={`text-xl font-semibold mb-2 ${textAccent}`}>
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-gray-200 pl-4 hover:border-gray-400 transition"
                >
                  <p className="font-medium">
                    {edu.degree} <span className="text-gray-500">– {edu.institute}</span>
                  </p>
                  {(edu.branch || edu.gpa) && (
                    <p className="text-gray-600 text-sm">
                      {edu.branch} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </p>
                  )}
                  {edu.start && (
                    <p className="text-gray-500 text-sm">{edu.start}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h3 className={`text-xl font-semibold mb-2 ${textAccent}`}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-full border text-sm font-medium bg-${secondaryColor}/10 text-${secondaryColor}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;
