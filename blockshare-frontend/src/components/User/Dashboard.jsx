import React from 'react'
import { useAuth } from '../auth/AuthProvider';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Upload from './Upload';

const Dashboard = () => {
  

  return (
    <div className="flex h-screen">
  <Sidebar />
  <div className="flex flex-col w-full">
    <Navbar />
    <div className="flex-grow p-6 overflow-y-auto">
      {/* Content inside the main area */}
      <Outlet />
    </div>
  </div>
</div>
  );
};

export default Dashboard;
