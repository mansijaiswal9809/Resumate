import React from "react";

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-gray-300 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">ResuMate</h2>
          <p className="text-gray-400">
            Making every customer feel valued—no matter the size of your audience.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Support</a></li>
            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition">Affiliate</a></li>
            <li><a href="#" className="hover:text-white transition">Resources</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Blogs</a></li>
            <li><a href="#" className="hover:text-white transition">Community</a></li>
            <li><a href="#" className="hover:text-white transition">Careers <span className="text-blue-400">We’re hiring!</span></a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Legal</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        © 2025 Resumate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
