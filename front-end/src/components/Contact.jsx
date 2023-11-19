import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    const developers = [
      {
        name: 'Rohit Bhandare',
        email: 'rohitb.comp_ioe@bkc.met.edu',
        mobile: '+1234567890',
      },
      {
        name: 'Chetan Kasar',
        email: 'chetansk.comp_ioe@bkc.met.edu',
        mobile: '+1234567890',
      },
      {
        name: 'Pranav Gadakh',
        email: 'pranavg.comp_ioe@bkc.met.edu',
        mobile: '+1234567890',
      },
      {
        name: 'Shubham Tile',
        email: 'shubhamt.comp_ioe@bkc.met.edu',
        mobile: '+1234567890',
      },
    ];

    return (
      <div className="container mx-auto mt-8 bg-gradient-to-br from-blue-400 to-purple-500 p-8 rounded-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-white">Contact Developers</h1>
        {/* Display developers' contact information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {developers.map((developer, index) => (
            <div
              key={index}
              className="bg-blue-200 rounded-lg p-4 shadow-md transform transition duration-300 hover:scale-105"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-500 transition duration-300">
                {developer.name}
              </h2>
              <p className="text-lg mb-2 text-gray-800 hover:text-blue-500 transition duration-300">
                Mobile: {developer.mobile}
              </p>
              <p className="text-lg mb-2 text-gray-800 hover:text-blue-500 transition duration-300">
                Email: {developer.email}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Contact Form */}
          <form className="bg-purple-200 rounded-lg shadow-md p-6 border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-green-900">Get In Touch</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-800 mb-2">
                Message
              </label>
              <textarea
                id="message"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="bg-green-200 rounded-lg shadow-md p-6 border border-gray-300">
            <h2 className="text-2xl font-bold mb-2 text-purple-900">Contact Information</h2>
            <p className="text-lg mb-2 text-gray-800">Email: info@blockshare.com</p>
            <p className="text-lg mb-2 text-gray-800">Phone: +1234567890</p>
            <p className="text-lg mb-2 text-gray-800">Address: Nashik,Maharshtra,India</p>
          </div>
        </div>
      </div>
    );
  }
}
