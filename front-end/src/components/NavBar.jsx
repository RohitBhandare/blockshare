import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-4xl font-extrabold">
          <span className="text-blue-500">Block</span>
          <span className="text-green-500">Share</span>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} mt-0 lg:mt-0 lg:w-auto lg:flex-row lg:items-center lg:space-x-4`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 lg:mt-0">
            <Link
              to="/"
              className="text-2xl font-extrabold text-indigo-500 no-underline hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-2xl font-extrabold text-yellow-500 no-underline hover:text-blue-500"
            >
              About
            </Link>
            <Link
              to="/service"
              className="text-2xl font-extrabold text-green-500 no-underline hover:text-blue-500"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-2xl font-extrabold text-pink-500 no-underline hover:text-blue-500"
            >
              Contact
            </Link>
          </div>

          {/* Login and Signup Buttons */}
          <div className="mt-2 lg:mt-0">
            <Link
              to="/user-dashboard"
              className="text-1xl font-extrabold text-white no-underline bg-blue-500 mb-2 px-6 py-2 rounded-md block hover:bg-blue-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-1xl font-extrabold text-white no-underline bg-green-500 px-6 py-2 rounded-md block hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
