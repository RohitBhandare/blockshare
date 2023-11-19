import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-purple-600 to-blue-500 text-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-bounce">Welcome to BlockShare</h1>
          <p className="text-2xl mb-8 animate-pulse">
            Your trusted platform for secure and decentralized file sharing.
          </p>
          <Link
            to="/about"
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
<section className="bg-gray-100 py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-gray-800">Key Features</h2>
    <div className="flex flex-wrap justify-center items-center gap-8">
      {/* Feature cards */}
      {/* Feature 1: Secure Storage */}
      <div className="bg-blue-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">Secure Storage</h3>
        <p className="text-lg mb-4">
          Your files are securely stored using cutting-edge blockchain technology.
        </p>
      </div>
      {/* Feature 2: Transparency */}
      <div className="bg-green-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">Transparency</h3>
        <p className="text-lg mb-4">
          Complete visibility into your data sharing and access logs.
        </p>
      </div>
      {/* Feature 3: IPFS Storage */}
      <div className="bg-yellow-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">IPFS Storage</h3>
        <p className="text-lg mb-4">
          Utilizing InterPlanetary File System for decentralized file storage.
        </p>
      </div>
      {/* Feature 4: Machine Learning */}
      <div className="bg-purple-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">Machine Learning Integration</h3>
        <p className="text-lg mb-4">
          Incorporate machine learning capabilities for data analysis and insights.
        </p>
      </div>
      {/* Feature 5: Artificial Intelligence */}
      <div className="bg-pink-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">Artificial Intelligence Integration</h3>
        <p className="text-lg mb-4">
          Enhance functionalities with AI-powered decision-making capabilities.
        </p>
      </div>
      {/* Feature 6: Data Availability */}
      <div className="bg-orange-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">High Data Availability</h3>
        <p className="text-lg mb-4">
          Ensuring 100% data availability for seamless accessibility.
        </p>
      </div>
      {/* Feature 7: High Bandwidth */}
      <div className="bg-red-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">High Bandwidth</h3>
        <p className="text-lg mb-4">
          Access and transfer data with high-speed bandwidth capabilities.
        </p>
      </div>
      <div className="bg-cyan-400 shadow-lg rounded-lg p-8 mb-6 w-full md:w-1/3 transform transition duration-300 hover:scale-105">
        <h3 className="text-2xl font-bold mb-4">Auto File Arrangement using ML</h3>
        <p className="text-lg mb-4">
          Utilize machine learning algorithms to automatically arrange and categorize files based on content analysis, file types, and usage patterns.
        </p>
      </div>
      {/* Add more feature cards */}
    </div>
  </div>
</section>


      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service cards */}
            {/* Service 1 */}
            <div className="bg-red-400 shadow-lg rounded-lg p-8 mb-6 transform transition duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">File Sharing</h3>
              <p className="text-lg mb-4">
                Effortlessly share files with our intuitive platform.
              </p>
            </div>
            {/* Service 2 */}
            <div className="bg-purple-400 shadow-lg rounded-lg p-8 mb-6 transform transition duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Collaboration Tools</h3>
              <p className="text-lg mb-4">
                Enhance teamwork with collaborative features.
              </p>
            </div>
            {/* Service 3 */}
            <div className="bg-orange-400 shadow-lg rounded-lg p-8 mb-6 transform transition duration-300 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Data Security</h3>
              <p className="text-lg mb-4">
                Ensure data security through advanced measures.
              </p>
            </div>
            {/* Add more service cards */}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 BlockShare. All Rights Reserved.</p>
          {/* Social media icons, additional links, etc. */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
