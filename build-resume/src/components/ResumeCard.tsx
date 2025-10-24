import React from "react";
// import { User } from "lucide-react";
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
  branch: string;
  gpa: string;
  start: string;
}

interface ResumeCardProps {
  userImage?: File | string;
  fullName: string;
  profession: string;
  email: string;
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
  userImage,
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
  const accent = `bg-${secondaryColor}`;
  const textAccent = `text-${secondaryColor}`;

  return (
    <div
      className={`hidden flex-1 lg:flex text-sm flex-col ${className} bg-white rounded-2xl shadow-xl w-full overflow-hidden`}
    >
      {/* Header with colored accent */}
      <div className={`relative ${accent} w-full`}>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          {userImage && (
            <img
              src={
                typeof userImage === "string"
                  ? userImage
                  : URL.createObjectURL(userImage)
              }
              alt="User"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
          )}
        </div>
      </div>

      {/* Name and profession */}
       <div className="mt-16 text-center px-6 pb-6 border-b mx-6">
      <h2 className={`text-4xl font-bold ${textAccent}`}>{fullName}</h2>
      {profession && <p className="text-gray-700 text-3xl mt-1">{profession}</p>}

      <div className="flex flex-wrap gap-4 justify-center mt-2 text-gray-500 text-sm">
        {email && (
          <div className="flex items-center gap-1">
            <Mail size={16} /> <span>{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-1">
            <Phone size={16} /> <span>{phone}</span>
          </div>
        )}
        {city && (
          <div className="flex items-center gap-1">
            <MapPin size={16} /> <span>{city}</span>
          </div>
        )}
        {linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin size={16} /> <span>{linkedin}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-1">
            <Globe size={16} /> <span>{website}</span>
          </div>
        )}
      </div>
    </div>

      {/* Content sections */}
      <div className="px-6 py-4 space-y-4 ">
        {/* Summary */}
        {summary && (
          <div className="border-b pb-4">
            <h3
              className={`text-xl font-bold mb-1  inline-block ${textAccent}`}
            >
              Summary
            </h3>
            <p className="text-gray-700 text-sm mt-1">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="border-b pb-4">
            <h3
              className={`text-xl font-bold mb-2  inline-block ${textAccent}`}
            >
              Experience
            </h3>
            <div className="space-y-2">
              {experience.map((exp, idx) => (
                <div key={idx} className={`pl-2 border-l-2 ${accent}`}>
                  <p className="font-medium">
                    {exp.role} @ {exp.company}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {exp.start} - {exp.end}
                  </p>
                  <p className="text-gray-600 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="border-b pb-4">
            <h3
              className={`text-xl font-bold mb-2 inline-block ${textAccent}`}
            >
              Education
            </h3>
            <div className="space-y-2">
              {education.map((edu, idx) => (
                <div key={idx} className={`pl-2 border-l-2 ${accent}`}>
                  <p className="font-medium">
                    {edu.degree} - {edu.institute}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {edu.branch && edu.branch}  {edu.gpa &&  `| ${edu.gpa}`}
                  </p>
                  {edu. start && <p className="text-gray-600 text-sm">{edu.start}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div >
            <h3
              className={`text-xl font-bold mb-2  inline-block ${textAccent}`}
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 rounded-full text-sm ${accent} text-gray`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;
