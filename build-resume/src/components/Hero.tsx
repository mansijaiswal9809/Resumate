import React from "react";

const users = [
  "/users/user1.jpg",
  "/users/user2.jpg",
  "/users/user3.jpg",
  "/users/user4.jpg",
  "/users/user5.jpg",
];

const brands = [
  "/brands/logo1.png",
  "/brands/logo2.png",
  "/brands/logo3.png",
  "/brands/logo4.png",
];

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-50 px-6 md:px-12 py-20 text-center">
      {/* Top User Highlight */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          {users.map((user, idx) => (
            <img
              key={idx}
              src={user}
              alt={`user${idx + 1}`}
              className="w-10 h-10 rounded-full border-2 border-white shadow"
            />
          ))}
        </div>
        <span className="text-gray-600 font-medium text-sm md:text-base">
          Used by 10,000+ users
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 max-w-3xl mx-auto">
        Land your dream job with <span className="text-blue-600">AI-powered resumes</span>.
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
        Create, edit and download professional resumes with AI-powered assistance.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
        <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Try Demo
        </button>
      </div>

      {/* Trusted Brands */}
      <div>
        <p className="text-gray-500 uppercase text-sm mb-4">
          Trusted by leading brands, including
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          {brands.map((brand, idx) => (
            <img key={idx} src={brand} alt={`brand${idx + 1}`} className="h-8" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
