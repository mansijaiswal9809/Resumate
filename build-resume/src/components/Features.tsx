import React from "react";
import { Cog6ToothIcon, BoltIcon, ShieldCheckIcon, DocumentIcon } from "@heroicons/react/24/outline";


const features = [
  {
    title: "Simple Process",
    description:
      "Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.",
    icon: Cog6ToothIcon,
  },
  {
    title: "Real-Time Suggestions",
    description:
      "Get instant AI-powered suggestions to improve your resume, highlight your strengths, and optimize for job applications.",
    icon: BoltIcon,
  },
  {
    title: "Secure & Private",
    description:
      "End-to-end encryption ensures your personal data is safe. Your resume is stored securely with full privacy compliance.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Customizable Templates",
    description:
      "Export resumes in multiple formats with professional templates, ready for any job or career stage.",
    icon: DocumentIcon,
  },
];

const Features: React.FC = () => {
  return (
    <section id="feature" className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose ResuMate?
        </h2>
        <p className="text-gray-600 mt-4 text-lg md:text-xl">
          AI-powered tools to build your resume quickly, securely, and professionally.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <Icon className="w-12 h-12 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
