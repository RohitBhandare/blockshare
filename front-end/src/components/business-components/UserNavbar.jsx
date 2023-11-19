import React, { Component } from 'react'

export default class UserNavbar extends Component {
  render() {
    return (
        <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-white text-xl font-bold">
            <span className="text-blue-500">YourLogo</span>
          </div>
  
          {/* Navigation Links */}
          <div className="space-x-4">
            <a href="/" className="text-white hover:text-blue-500">
              Home
            </a>
            <a href="/services" className="text-white hover:text-blue-500">
              Services
            </a>
            <a href="/about" className="text-white hover:text-blue-500">
              About
            </a>
            <a href="/contact" className="text-white hover:text-blue-500">
              Contact
            </a>
          </div>
  
          {/* User Actions */}
          <div className="space-x-4">
            <a href="/profile" className="text-white hover:text-blue-500">
              Profile
            </a>
            <a href="/settings" className="text-white hover:text-blue-500">
              Settings
            </a>
            <a href="/logout" className="text-white hover:text-blue-500">
              Logout
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
