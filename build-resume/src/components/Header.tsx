import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, fetchUser } from "../store/userSlice";
import LoginRegisterModal from "./Login"; // make sure path is correct
import type { AppDispatch, RootState } from "../store/store";
import axios from "axios";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Features", id: "feature" },
  { name: "Testimonials", id: "testimonial" },
  { name: "Contact", id: "footer" },
];

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate= useNavigate()
  const user = useSelector((state: RootState) => state.user.user); // Redux user
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // Login/Register modal

  // Fetch user on mount
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false); // close mobile menu
  };

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    dispatch(clearUser());
  };

  const handleGetStarted = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      navigate("/resume");
    }
  };

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
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <Link to="/" className="font-bold text-xl text-blue-600">
              ResuMate
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            {navItems.map((item, idx) => (
              <motion.li
                key={idx}
                className="hover:text-blue-600 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </motion.li>
            ))}
          </motion.ul>

          {/* Buttons */}
          <motion.div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Welcome, {user.fullName}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </button>
              </>
            )}
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Get Started
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 cursor-pointer"
          >
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
                  <motion.li
                    key={idx}
                    className="hover:text-blue-600 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.name}
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
                {user ? (
                  <>
                    <span className="text-gray-700 font-medium">
                      Welcome, {user.fullName}!
                    </span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-gray-700 hover:text-blue-600 transition cursor-pointer"
                    >
                      Login
                    </button>
                  </>
                )}
                <button
                  onClick={handleGetStarted}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login/Register Modal */}
      <LoginRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
