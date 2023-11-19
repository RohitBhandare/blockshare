import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faFileImage,
  faFileAlt,
  faFileWord,
  faDownload,
  faShare,
  faEye,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import FileService from './file-service/FileService';
import FileShareModal from './Modals/FileShareModal';

export default class DisplayFiles extends Component {
  state = {
    files: [],
    showModal: false,
    selectedFile: null,
    fileName: null,
    loading: true, // Add a loading state
    fileToShare: null,
  };

  getFileExtension = (fileName) => {
    return fileName.split('.').pop(); // Extracting file extension
  };

  async componentDidMount() {
    try {
      setTimeout(async () => {
        const files = await FileService.getAllFiles();
        this.setState({ files, loading: false }); // Set loading to false when files are fetched
      }, 2000); // Simulated delay of 2 seconds
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }

  handleDownload = (fileName) => {
    console.log(`Downloading ${fileName}`);
    // Add logic for downloading the file
  };

  handleShare = (fileName) => {
    console.log(`Sharing ${fileName}`);
    this.setState({
      fileToShare: fileName,
    });
  };

  handleAccess = (fileName) => {
    console.log(`Accessing ${fileName}`);
    // Add logic for accessing the file
  };

  handleView = (fileName, selectedFileName) => {
    console.log(`Viewing ${selectedFileName}`);
    this.setState({ showModal: true, selectedFile: selectedFileName, fileName });
    // Add logic for viewing the file
  };
  closeModal = () => {
    this.setState({ fileToShare: null });
  };

  render() {
    const { files, showModal, selectedFile, fileToShare,fileName,loading } = this.state;
    const filesArray = Object.values(files);
    // console.log(filesArray)
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-start min-h-screen p-10">
          <div className="animate-spin rounded-full h-24 w-24 border-8 border-indigo-600 border-t-transparent border-red-500"></div>
        </div>
      );
    }
    return (
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start p-6">
        <h1 className="col-span-full text-3xl font-bold mb-2 mt-1 text-purple-700 animate-pulse flex items-center justify-center py-0">
  Uploaded files
</h1>

        {filesArray.map((file, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-md bg-gray-100 transform transition duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            <div
              className={`h-40 bg-gradient-to-br ${
                (() => {
                  console.log("file",file)
                  console.log("name",file.name)
                  const type = this.getFileExtension(file.name);
                  switch (type) {
                    case 'pdf':
                      return 'from-red-400 to-red-600';
                    case 'jpg':
                    case 'png':
                      return 'from-blue-400 to-blue-600';
                    case 'txt':
                      return 'from-green-400 to-green-600';
                    case 'docx':
                      return 'from-yellow-400 to-yellow-600';
                    default:
                      return 'from-purple-400 to-purple-600';
                  }
                })()
              }`}
            >
              {/* File type icons */}
              <div className="flex items-center justify-center h-full">
                <div className="text-white text-4xl">
                  {(() => {
                    const type = this.getFileExtension(file.name);
                    switch (type) {
                      case 'pdf':
                        return <FontAwesomeIcon icon={faFilePdf} />;
                      case 'jpg':
                      case 'png':
                        return <FontAwesomeIcon icon={faFileImage} />;
                      case 'txt':
                        return <FontAwesomeIcon icon={faFileAlt} />;
                      case 'docx':
                        return <FontAwesomeIcon icon={faFileWord} />;
                      default:
                        return <FontAwesomeIcon icon={faFileWord} />;
                    }
                  })()}
                </div>
              </div>
            </div>
            {/* File details */}
            <div className="p-4">
              <p className="text-gray-800 text-lg font-semibold">{file.name}</p>
              {/* Action buttons */}
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => this.handleDownload(file)}
                  className="text-gray-800 px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                
                <button
                  onClick={() => this.handleShare(file)}
                  className="text-gray-800 px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faShare} />
                </button>
                <button
                  onClick={() => this.handleAccess(file)}
                  className="text-gray-800 px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
                <button
                  onClick={() => this.handleView(file.name, file.hash)}
                  className="text-gray-800 px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Modal */}
        {showModal && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg">
              <p className="text-lg font-semibold mb-4">Viewing: {selectedFile}</p>
              {/* {fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? (
                <img src={`https://gateway.pinata.cloud/ipfs/${selectedFile}`} alt="img" />
              ) : ( */}
                <iframe
                  title="PDF Viewer"
                  src={`https://gateway.pinata.cloud/ipfs/${selectedFile}`}
                  width="100%"
                  height="500px"
                />
              {/* )} */}
              <button
                onClick={() => this.setState({ showModal: false })}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Modal for sharing */}
        {fileToShare && (
          <FileShareModal
            fileName={fileToShare}
            closeModal={this.closeModal}
            handleShare={this.handleShare}
          />
        )}
      </div>
    );
  }
}
