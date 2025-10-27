import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import LoginRegisterModal from "./Login";
const users = [
  "https://randomuser.me/api/portraits/women/44.jpg",

  "https://randomuser.me/api/portraits/men/32.jpg",

  "https://randomuser.me/api/portraits/women/65.jpg",

  "https://randomuser.me/api/portraits/men/76.jpg",

  "https://randomuser.me/api/portraits/women/12.jpg",
];
 const brands=[
  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', alt: 'Google' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', alt: 'Microsoft' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', alt: 'Apple' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', alt: 'Amazon' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', alt: 'Facebook' }
];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const handleNavigate = () => {
    if (user) {
      navigate("/resume");
    } else {
      setOpenLogin(true);
    }
  };
  return (
    <section id="hero" className="bg-gray-50 px-6 md:px-12 py-20 text-center">
      {/* Top User Highlight */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          {users.map((user, idx) => (
            <img
              key={idx}
              src={user}
              alt={`user${idx + 1}`}
              className={`w-10 h-10 rounded-full border-2 border-white shadow translate-x-[${
                (4 - Number(idx)) * 20
              }px]`}
            />
          ))}
        </div>
        <span className="text-gray-600 font-medium text-sm md:text-base">
          Used by 10,000+ users
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 max-w-3xl mx-auto">
        Land your dream job with{" "}
        <span className="text-blue-600">AI-powered resumes</span>.
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
        Create, edit and download professional resumes with AI-powered
        assistance.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <button
          onClick={handleNavigate}
          className="bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
        <button
          disabled
          className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
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
            <img
              key={idx}
              src={brand.src}
              alt={brand.alt}
              className="h-8"
            />
          ))}
        </div>
      </div>
      {openLogin && (
        <LoginRegisterModal isOpen={true} onClose={() => setOpenLogin(false)} />
      )}
    </section>
  );
};

export default Hero;
