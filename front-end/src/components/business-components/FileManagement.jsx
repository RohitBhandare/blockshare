import React, { Component } from 'react';
import FileService from './file-service/FileService';

export default class FileManagement extends Component {
  state = {
    selectedFile: null,
    uploadNotification: null,
    uploading: false, // Added state for tracking file upload progress
  };

  handleFileSelection = (event) => {
    const file = event.target.files[0];
    console.log('File selected:', file);
    this.setState({ selectedFile: file });
  };

  handleFileUpload = async () => {
    const { selectedFile } = this.state;
    if (!selectedFile) {
      console.error('No file selected!');
      this.setState({ uploadNotification: 'Please select a file!' });
      return;
    }

    try {
      this.setState({ uploading: true, uploadNotification: 'Wait a while, we are encrypting your file...' });
      const response = await FileService.uploadFile(selectedFile);
      console.log('File uploaded successfully:', response);
      this.setState({
        uploadNotification: 'File uploaded successfully!',
        uploading: false, // Reset uploading state after successful upload
      });
      // Perform any additional actions after successful upload
    } catch (error) {
      // Handle any upload errors
      console.error('File upload failed:', error.message);
      this.setState({
        uploadNotification: 'File upload failed!',
        uploading: false, // Reset uploading state on upload failure
      });
    }
  };

  handleCancelUpload = () => {
    this.setState({ selectedFile: null, uploadNotification: null });
  };

  render() {
    const { selectedFile, uploadNotification, uploading } = this.state;

    return (
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">File Management</h1>
        <div className="border-dashed border-2 border-gray-300 p-8 rounded-md mb-4">
          <p className="text-gray-500 text-center">Drag and drop files here</p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={this.handleFileSelection}
          />
          <label
            htmlFor="file-upload"
            className="block text-center mt-4 py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Select File
          </label>
          {selectedFile && (
            <div className="text-center mt-4">
              <p className="text-gray-700">Selected File: {selectedFile.name}</p>
              <button
                onClick={this.handleCancelUpload}
                className="block mx-auto mt-2 py-1 px-3 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}
          {uploadNotification && (
            <p className="text-center text-sm text-red-500 mt-2">{uploadNotification}</p>
          )}
          {selectedFile && !uploadNotification && !uploading && (
            <button
              onClick={this.handleFileUpload}
              className="block mx-auto mt-4 py-2 px-4 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600 transition duration-300"
            >
              Upload
            </button>
          )}
          {uploading && (
            <p className="text-center text-sm text-blue-500 mt-2">
              Wait a while, we are encrypting your file...
            </p>
          )}
        </div>
      </div>
    );
  }
}
