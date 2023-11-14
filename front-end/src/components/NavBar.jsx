import React, { Component } from 'react';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-xl font-bold">
            <span className="text-blue-500">BlockShare</span>
          </div>
  
          {/* Navigation Links */}
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-blue-500">
              Home
            </a>
            <a href="#" className="text-white hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-white hover:text-blue-500">
              Services
            </a>
            <a href="#" className="text-white hover:text-blue-500">
              Contact
            </a>
          </div>
  
          {/* Login and Signup Buttons */}
          <div className="space-x-4">
            <button className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Login
            </button>
            <button className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
