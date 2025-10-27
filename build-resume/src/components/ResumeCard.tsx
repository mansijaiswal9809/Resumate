import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  phone?: string;
  city?: string;
  linkedin?: string;
  website?: string;
}

// 🔹 Sortable item wrapper for each section
const SortableSection: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-grab active:cursor-grabbing hover:shadow-md"
    >
      {children}
    </div>
  );
};

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
}) => {
  const [sections, setSections] = useState<string[]>([
    "summary",
    "experience",
    "education",
    "skills",
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8 flex-1">
      {/* Header */}
      <div className="text-center border-b pb-6 mb-6">
        <h2 className="text-4xl font-bold">{fullName}</h2>
        {profession && (
          <p className="text-gray-700 text-xl mt-1 font-medium">
            {profession}
          </p>
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

      {/* Draggable Sections */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {sections.map((section) => {
              switch (section) {
                case "summary":
                  return (
                    summary && (
                      <SortableSection key="summary" id="summary">
                        <h3 className="text-xl font-semibold mb-2">Summary</h3>
                        <p className="text-gray-700">{summary}</p>
                      </SortableSection>
                    )
                  );
                case "experience":
                  return (
                    experience.length > 0 && (
                      <SortableSection key="experience" id="experience">
                        <h3 className="text-xl font-semibold mb-2">
                          Experience
                        </h3>
                        <div className="space-y-3">
                          {experience.map((exp, idx) => (
                            <div
                              key={idx}
                              className="border-l-4 border-gray-200 pl-4 hover:border-gray-400 transition"
                            >
                              <p className="font-medium">
                                {exp.role}{" "}
                                <span className="text-gray-500">
                                  @ {exp.company}
                                </span>
                              </p>
                              <p className="text-gray-500 text-sm">
                                {exp.start} – {exp.end}
                              </p>
                              <p className="text-gray-700 mt-1">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </SortableSection>
                    )
                  );
                case "education":
                  return (
                    education.length > 0 && (
                      <SortableSection key="education" id="education">
                        <h3 className="text-xl font-semibold mb-2">
                          Education
                        </h3>
                        <div className="space-y-3">
                          {education.map((edu, idx) => (
                            <div
                              key={idx}
                              className="border-l-4 border-gray-200 pl-4 hover:border-gray-400 transition"
                            >
                              <p className="font-medium">
                                {edu.degree}{" "}
                                <span className="text-gray-500">
                                  – {edu.institute}
                                </span>
                              </p>
                              {(edu.branch || edu.gpa) && (
                                <p className="text-gray-600 text-sm">
                                  {edu.branch}{" "}
                                  {edu.gpa && `| GPA: ${edu.gpa}`}
                                </p>
                              )}
                              {edu.start && (
                                <p className="text-gray-500 text-sm">
                                  {edu.start}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </SortableSection>
                    )
                  );
                case "skills":
                  return (
                    skills.length > 0 && (
                      <SortableSection key="skills" id="skills">
                        <h3 className="text-xl font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-full border text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </SortableSection>
                    )
                  );
                default:
                  return null;
              }
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ResumeCard;
