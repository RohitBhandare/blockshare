import React, { useState } from 'react';
import FileService from '../../services/FileService';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const ethereumAddress = localStorage.getItem('ethereum_address');
     
      if (!userData || !userData.id) {
        throw new Error('User information not found.');
      }

      const response = await FileService.uploadFile(selectedFile, userData.id, ethereumAddress);
      alert(`File "${selectedFile.name}" uploaded successfully`);
      console.log('File uploaded successfully:', selectedFile.name);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setUploadError('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="bg-gray-300 p-8 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Upload File</h2>
      <div 
        className="flex items-center bg-gray-100 justify-center h-32 border-dashed border-2 border-gray-400 rounded-md mb-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          {selectedFile ? (
            <div className="text-center">
              <p className="font-semibold">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">Click to change file</p>
            </div>
          ) : (
            <p className="text-gray-500">Drag and drop or click to select file</p>
          )}
        </label>
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
        className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {uploading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            </svg>
            Uploading...
          </div>
        ) : (
          'Upload'
        )}
      </button>
      {uploadError && (
        <div className="text-red-600 mt-4">{uploadError}</div>
      )}
    </div>
  );
};

export default Upload;
