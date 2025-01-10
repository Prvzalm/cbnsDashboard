import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BlogIcon, DashboardIcon, Logout } from "../assets";

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed h-full bg-[#212529] text-white flex flex-col justify-between transition-transform duration-300 lg:w-64 z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">CRIBONIX</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 overflow-y-auto">
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-200"
                onClick={() => setIsMenuOpen(false)} // Close menu on mobile
              >
                <img className="w-6 h-6" src={DashboardIcon} alt="Dashboard" />
                <span className="ml-3">DASHBOARD</span>
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-200"
                onClick={() => setIsMenuOpen(false)} // Close menu on mobile
              >
                <img className="w-6 h-6" src={BlogIcon} alt="Blog" />
                <span className="ml-3">BLOG</span>
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-200"
                onClick={() => setIsMenuOpen(false)} // Close menu on mobile
              >
                <img className="w-6 h-6" src={BlogIcon} alt="Portfolio" />
                <span className="ml-3">PORTFOLIO</span>
              </Link>
            </li>
            <li>
              <Link
                to="/testimonial"
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-200"
                onClick={() => setIsMenuOpen(false)} // Close menu on mobile
              >
                <img className="w-6 h-6" src={BlogIcon} alt="Testimonial" />
                <span className="ml-3">TESTIMONIAL</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 hover:bg-red-600 transition duration-200"
          >
            <img className="w-6 h-6" src={Logout} alt="Logout" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none p-2 rounded bg-gray-800"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-0 lg:ml-64 flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
