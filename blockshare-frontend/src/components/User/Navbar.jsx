import React from 'react';
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
  const { logout, user,ethereumAddress } = useAuth(); // Destructure the logout function from the authentication context

  return (
    <nav className="bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo or Brand */}
        {/* <div className="flex-shrink-0">
          <span className="text-white text-2xl font-bold">BlockShare</span>
        </div> */}
        {/* Search Bar */}
        <div className="flex-1 ml-4">
          <div className="max-w-lg mx-auto relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-5-5" />
              </svg>
            </span>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-4 items-center">
          <div>
            <span className="text-white text-sm font-bold block">{user.email}</span>
            <span className="text-white text-xs font-bold block">Account: <span className="text-green-500 text-xs ">{ethereumAddress}</span></span>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
