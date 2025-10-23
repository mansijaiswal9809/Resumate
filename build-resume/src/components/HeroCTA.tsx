import React from "react";

const HeroCTA: React.FC = () => {
  return (
    <section className="bg-blue-50 py-32 px-6 md:px-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto">
        Build a Professional Resume That Helps You <span className="text-blue-600">Stand Out and Get Hired</span>
      </h1>
      <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
        Get Started
      </button>
    </section>
  );
};

export default HeroCTA;
