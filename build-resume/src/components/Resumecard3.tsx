import React, { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

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
  fullName: string;
  profession: string;
  email: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  className?: string;
  phone?: string;
  city?: string;
  linkedin?: string;
  website?: string;
}

const ResumeCard3: React.FC<ResumeCardProps> = ({
  fullName,
  profession,
  email,
  summary,
  experience = [],
  education = [],
  skills = [],
  phone,
  city,
  linkedin,
  website,
}) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;

    // Use html2canvas to capture the element as an image
    const canvas = await html2canvas(element, {
      scale: 2, // higher scale for better quality
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fullName}-Resume.pdf`);
  };

  return (
    <div>
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 duration-100 transition"
        >
          <Download size={16} /> Download PDF
        </button>
      </div>

      <div
        ref={resumeRef}
        className={`text-white bg-blue-600 flex-1 lg:flex shadow-xl overflow-hidden min-h-[1123px] max-w-6xl mx-auto transition-transform hover:-translate-y-1`}
      >
        {/* Sidebar */}
        <aside className={`w-1/3 flex flex-col justify-between bg-linear-to-b p-8`}>
          <div>
            <h2 className="text-3xl font-bold mb-1">{fullName}</h2>
            <p className="text-lg">{profession}</p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3 text-sm">
              {email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} /> <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} /> <span>{phone}</span>
                </div>
              )}
              {city && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> <span>{city}</span>
                </div>
              )}
              {linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={16} />
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="underline">
                    LinkedIn
                  </a>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <a href={website} target="_blank" rel="noopener noreferrer" className="underline">
                    Portfolio
                  </a>
                </div>
              )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-3 border-b border-white/30 pb-1">Skills</h3>
                <div className="flex flex-wrap gap-2 font-semibold text-md">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/10 border border-white/30 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 bg-gray-50 space-y-10 text-black">
          {/* Summary */}
          {summary && (
            <section>
              <h3 className={`text-2xl font-semibold mb-3 text-black`}>Profile Summary</h3>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h3 className={`text-2xl font-semibold mb-3`}>Experience</h3>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className={`border-l-4 border-blue-600 pl-4 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition`}
                  >
                    <h4 className="font-semibold text-lg">
                      {exp.role} <span className="text-gray-500 font-normal">@ {exp.company}</span>
                    </h4>
                    <p className="text-gray-500 text-sm mb-2">
                      {exp.start} – {exp.end}
                    </p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className={`text-2xl font-semibold mb-3`}>Education</h3>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className={`border-l-4 border-blue-600 pl-4 bg-white rounded-lg shadow-sm p-4`}
                  >
                    <h4 className="font-semibold text-lg">
                      {edu.degree} <span className="text-gray-500 font-normal">– {edu.institute}</span>
                    </h4>
                    {(edu.branch || edu.gpa) && (
                      <p className="text-gray-600 text-sm">
                        {edu.branch} {edu.gpa && `| GPA: ${edu.gpa}`}
                      </p>
                    )}
                    {edu.start && <p className="text-gray-500 text-sm mt-1">{edu.start}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default ResumeCard3;
