import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-900 transition duration-300 transform hover:scale-110 animate-pulse">
          About BlockShare
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Features Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2 text-purple-900">Key Features</h2>
            <ul className="list-disc pl-6">
              <li className="text-lg text-gray-800 mb-2">
                Secure decentralized storage using blockchain
              </li>
              <li className="text-lg text-gray-800 mb-2">
                End-to-end encryption for files and data
              </li>
              <li className="text-lg text-gray-800 mb-2">
                Efficient and scalable file sharing capabilities
              </li>
              <li className="text-lg text-gray-800 mb-2">
                User-friendly interface for seamless interaction
              </li>
              {/* Add more key features */}
            </ul>
          </div>
          {/* Mission Card */}
          <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-2 text-green-900">Our Mission</h2>
            <p className="text-lg mb-2 text-gray-800">
              At BlockShare, our mission is to revolutionize the file sharing industry by providing a secure,
              decentralized, and user-centric platform for individuals and businesses to store and share their data.
            </p>
            {/* Add more details about your platform */}
          </div>
        </div>
      </div>
    );
  }
}
