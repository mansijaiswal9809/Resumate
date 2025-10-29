import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Download } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  phone?: string;
  city?: string;
  linkedin?: string;
  website?: string;
}

const ResumeCard2: React.FC<ResumeCardProps> = ({
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
  const [leftSections, setLeftSections] = useState([
    "summary",
    "experience",
    "education",
  ]);
  const [rightSections, setRightSections] = useState(["skills"]);

  const resumeRef = useRef<HTMLDivElement>(null);

  // 🧾 PDF Download
  const handleDownloadPDF = async () => {
    const input = resumeRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2, // Higher scale = better quality
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fullName.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList =
      source.droppableId === "left" ? leftSections : rightSections;
    const destList =
      destination.droppableId === "left" ? leftSections : rightSections;

    const [removed] = sourceList.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, removed);
      if (source.droppableId === "left") setLeftSections([...sourceList]);
      else setRightSections([...sourceList]);
    } else {
      destList.splice(destination.index, 0, removed);
      if (source.droppableId === "left") {
        setLeftSections([...sourceList]);
        setRightSections([...destList]);
      } else {
        setRightSections([...sourceList]);
        setLeftSections([...destList]);
      }
    }
  };

  const renderSection = (section: string) => {
    switch (section) {
      case "summary":
        return (
          summary && (
            <motion.section layout className="bg-white p-4 mb-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Profile Summary</h3>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </motion.section>
          )
        );
      case "experience":
        return (
          experience.length > 0 && (
            <motion.section layout className="bg-white p-4 mb-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              {experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">
                    {exp.role}{" "}
                    <span className="text-gray-500">@ {exp.company}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    {exp.start} – {exp.end}
                  </p>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </motion.section>
          )
        );
      case "education":
        return (
          education.length > 0 && (
            <motion.section layout className="bg-white p-4 mb-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">
                    {edu.degree}{" "}
                    <span className="text-gray-500">– {edu.institute}</span>
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
            </motion.section>
          )
        );
      case "skills":
        return (
          skills.length > 0 && (
            <motion.section layout className="bg-white p-4 mb-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm border"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.section>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 py-2 flex flex-col items-end">

      <button
        onClick={handleDownloadPDF}
        className="mb-2 flex items-center cursor-pointer gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        <Download size={18} /> Download PDF
      </button>


      <div
        ref={resumeRef}
        className="bg-white w-[210mm] min-h-[297mm] shadow-2xl rounded-xl p-10 flex flex-col"
        style={{ pageBreakAfter: "always" }}
      >
        {/* Header */}
        <header className="text-center border-b pb-4 mb-6">
          <h2 className="text-3xl font-bold">{fullName}</h2>
          <p className="text-lg text-gray-600">{profession}</p>
          <div className="flex justify-center flex-wrap gap-4 mt-3 text-sm text-gray-600">
            {email && (
              <span className="flex items-center gap-1">
                <Mail size={15} /> {email}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1">
                <Phone size={15} /> {phone}
              </span>
            )}
            {city && (
              <span className="flex items-center gap-1">
                <MapPin size={15} /> {city}
              </span>
            )}
            {linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin size={15} />
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-600"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {website && (
              <span className="flex items-center gap-1">
                <Globe size={15} />
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-blue-600"
                >
                  Portfolio
                </a>
              </span>
            )}
          </div>
        </header>

        {/* Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 flex-1">
            {/* Left */}
            <Droppable droppableId="left">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 min-h-[200px]"
                >
                  {leftSections.map((sectionId, index) => (
                    <Draggable
                      key={sectionId}
                      draggableId={sectionId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {renderSection(sectionId)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Right */}
            <Droppable droppableId="right">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 min-h-[200px]"
                >
                  {rightSections.map((sectionId, index) => (
                    <Draggable
                      key={sectionId}
                      draggableId={sectionId}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {renderSection(sectionId)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ResumeCard2;
