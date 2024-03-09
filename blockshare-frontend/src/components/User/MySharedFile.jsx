import React, { useState, useEffect } from 'react';
import FileService from '../../services/FileService';

const MySharedFiles = () => {
  // State to store the list of shared files and loading status
  const [sharedFiles, setSharedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSharedFiles = async () => {
      try {
        // Set loading to true when fetching data
        setLoading(true);
        // Fetch shared files for the current user
        const response = await FileService.getSharedFiles(userData.id);
        setSharedFiles(response.data);
      } catch (error) {
        console.error('Error fetching shared files:', error);
        // Handle error
      } finally {
        // Set loading to false when data fetching is complete
        setLoading(false);
      }
    };

    fetchSharedFiles();

  }, [userData.id]);

  // Function to handle revoking access for a file
  const revokeAccess = async (fileId, recipient_username) => {
    try {
      // Perform the action to revoke access for the file
      await FileService.revokeAccess(fileId, recipient_username);
      // Update the shared files list after revoking access
      alert('Access revoked successfully');
      const updatedFiles = sharedFiles.filter(file => file.id !== fileId);
      setSharedFiles(updatedFiles);
    } catch (error) {
      alert('Error revoking access');
      console.error('Error revoking access:', error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">My Shared Files</h2>
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : !sharedFiles? (
        <div className="text-center text-gray-600">
  No data available at the moment. <br />
  Please check back later or upload your files to start sharing!
</div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sharedFiles.map((file, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4">
              <embed src={`data:${file.file_type};base64,${file.content}`} className="w-full h-32 object-cover mb-2 rounded-md" />
              <p className="text-lg font-semibold">{file.filename}</p>
              <p className="text-sm text-gray-600">Owner: <span className="font-semibold">{file.owner}</span></p>
              <p className="text-sm text-gray-600">Recipient: <span className="font-semibold">{file.recipient_username}</span></p>
              <p className="text-sm text-gray-600">Access Level:  <span className="font-semibold">{file.access_level}</span></p>
              <p className="text-sm text-gray-600">Shared Time:  <span className="font-semibold">{file.shared_time}</span></p>
              <button onClick={() => revokeAccess(file.file_id, file.recipient_username)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Revoke Access</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySharedFiles;
