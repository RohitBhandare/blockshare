import React, { Component } from 'react';

export default class Service extends Component {
  render() {
    const services = [
      {
        title: 'File Sharing',
        description: 'Effortlessly share files with our intuitive platform.',
        color: 'bg-blue-200',
      },
      {
        title: 'Collaboration Tools',
        description: 'Enhance teamwork with collaborative features.',
        color: 'bg-yellow-200',
      },
      {
        title: 'Data Security',
        description: 'Ensure data security through advanced measures.',
        color: 'bg-green-200',
      },
      {
        title: 'Content Management',
        description: 'Organize, manage, and access your content seamlessly.',
        color: 'bg-purple-200',
      },
      {
        title: 'Data Backup',
        description: 'Automated and secure backup solutions for your data.',
        color: 'bg-pink-200',
      },
      {
        title: 'Analytics & Insights',
        description: 'Gain valuable insights through powerful analytics tools.',
        color: 'bg-indigo-200',
      },
      // Add more services
    ];

    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-900">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 ${service.color}`}
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-lg mb-4">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
