import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faShareAlt, faDownload, faHistory, faFolder, faUserFriends, faHomeUser, faPlus, faImages, faGear, faUserEdit } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-900 h-screen w-64  flex-shrink-0">
      <div>
        <div className="text-white p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">BlockShare</h1>
        </div>
        <ul className="mt-6">
        <Link to="/app/dashboard/upload">
            <div className="text-black font-bold p-3 hover:bg-gray-700 cursor-pointer rounded-full flex items-center justify-center bg-white hover:bg-gray-200" >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Upload
            </div>
          </Link>

          <Link to="/app/dashboard/home">
            <li className={`text-white p-4 my-3 cursor-pointer ${location.pathname === '/app/dashboard/home' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
              <FontAwesomeIcon icon={faHomeUser} className="mr-2" />
              Home
            </li>
          </Link>

          <Link to="/app/dashboard/files">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/files' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
              <FontAwesomeIcon icon={faFolder} className="mr-2" />
              My Files
            </li>
          </Link>

          <Link to="/app/dashboard/photos">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/photos' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
              <FontAwesomeIcon icon={faImages} className="mr-2" />
              My Photos
            </li>
          </Link>
          
          <Link to="/app/dashboard/my-shared-files">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/my-shared-files' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
              <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
              My Shared Files
            </li>
          </Link>

          <Link to="/app/dashboard/shared-with-me">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/shared-with-me' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
              <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
              Shared with Me
            </li>
          </Link>

          <Link to="/app/dashboard/recent">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/recent' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              Recent Activities
            </li>
          </Link>

          <Link to="/app/dashboard/transaction">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/transaction' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
              <FontAwesomeIcon icon={faHistory} className="mr-2" />
              Transaction History
            </li>
          </Link>

          <Link to="/app/dashboard/settings">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/settings' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
            <FontAwesomeIcon icon={faGear} className="mr-2" />
              Settings
            </li>
          </Link>

          <Link to="/app/dashboard/profile">
            <li className={`text-white p-4 cursor-pointer ${location.pathname === '/app/dashboard/profile' ? 'bg-white text-black' : 'hover:bg-gray-700'}`}>
            <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
              Profile
            </li>
          </Link>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
