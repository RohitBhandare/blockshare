import React, { Component } from 'react';

class FileShareModal extends Component {
  state = {
    shareWith: '', // To store the person to share with
    access: 'read', // Default access level
    // Add more fields as needed for sharing options
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { fileName, closeModal, handleShare } = this.props;
    const { shareWith, access /* Add more fields if needed */ } = this.state;

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Share File</h2>
          <p>Share {fileName} with:</p>
          {/* Input fields for sharing options */}
          <div className="flex flex-col mt-4">
            <label htmlFor="shareWith" className="text-gray-600 mb-2">
              Share with:
            </label>
            <input
              type="text"
              id="shareWith"
              name="shareWith"
              value={shareWith}
              onChange={this.handleInputChange}
              placeholder="Enter email or username"
              className="border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <label htmlFor="access" className="text-gray-600 mb-2">
              Access level:
            </label>
            <select
              id="access"
              name="access"
              value={access}
              onChange={this.handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4"
            >
              <option value="read">Read</option>
              <option value="write">Write</option>
              {/* Add more access levels if needed */}
            </select>
            {/* Add more fields for additional options */}
          </div>
          {/* Buttons for sharing and closing modal */}
          <div className="flex justify-end mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md mr-4"
            >
              Close
            </button>
            <button
              onClick={() => handleShare(fileName)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FileShareModal;
