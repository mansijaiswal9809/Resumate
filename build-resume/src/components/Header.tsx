import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginRegisterModal from "./Login"; // make sure path is correct

const navItems = ["Home", "Features", "Testimonials", "Contact"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // Login/Register modal

  return (
    <>
      <header className="sticky top-0 w-full z-50 shadow-sm bg-white">
        {/* Top Badge */}
        <div className="w-full bg-blue-50 text-blue-700 text-sm font-medium py-2 text-center">
          🌟 NewAI Feature Added
        </div>

        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-4">
          {/* Logo */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <svg
              width="180"
              height="48"
              viewBox="0 0 180 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#3B82F6" />
                  <stop offset="100%" stop-color="#2563EB" />
                </linearGradient>
              </defs>
              <rect x="2" y="4" width="40" height="40" rx="6" fill="url(#blueGradient)" />
              <polygon points="34,4 34,14 42,14" fill="#1E40AF" />
              <circle cx="22" cy="24" r="2" fill="white" />
              <circle cx="14" cy="32" r="1.5" fill="white" />
              <circle cx="30" cy="32" r="1.5" fill="white" />
              <line x1="22" y1="24" x2="14" y2="32" stroke="white" stroke-width="1" />
              <line x1="22" y1="24" x2="30" y2="32" stroke="white" stroke-width="1" />
              <text x="50" y="28" font-family="Poppins, sans-serif" font-weight="700" font-size="18" fill="#111827">
                ResuMate
              </text>
            </svg>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul
            className="hidden md:flex items-center space-x-8 text-gray-700 font-medium"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {navItems.map((item, idx) => (
              <motion.li
                key={idx}
                className="hover:text-blue-600 transition cursor-pointer"
                variants={{
                  hidden: { y: -10, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          {/* Buttons */}
          <motion.div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4 overflow-hidden"
            >
              <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
                {navItems.map((item, idx) => (
                  <motion.li key={idx} className="hover:text-blue-600 cursor-pointer" whileHover={{ scale: 1.05 }}>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login/Register Modal */}
      <LoginRegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
