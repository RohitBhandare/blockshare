import React, { useState, useEffect } from 'react';
import FileService from '../../services/FileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMessage, faDownload } from '@fortawesome/free-solid-svg-icons';
import FileDisplayModal from './Modals/FileDisplayModal';
import FileChatbotModal from './Modals/FileChatbotModal';

const SharedWithMe = () => {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileDisplayModalOpen, setFileDisplayModalOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));
  const [showChatbotModal, setShowChatbotModal] = useState(false);

  useEffect(() => {
    const fetchSharedWithMe = async () => {
      try {
        setLoading(true);
        const response = await FileService.getSharedWithMe(userData.id);
        setSharedFiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files shared with me:', error);
        setError('Error fetching files shared with me');
        setLoading(false);
      }
    };

    fetchSharedWithMe();
  }, [userData.id]);

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setFileDisplayModalOpen(true);
  };

  const handleFileChatbot = (file) => () => {
    setSelectedFile(file);
    setShowChatbotModal(true);
  };

  const handleDownload = (file) => {
    const byteCharacters = atob(file.content);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, { type: file.file_type });
    
        // Create a download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
  };
  

  const handleCloseChatbotModal = () => {
    setShowChatbotModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Shared With Me</h2>
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : !sharedFiles ? (
        <div className="text-center text-gray-600 mt-8">No files shared with you yet.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sharedFiles.map((file, index) => (
              <div key={index} className="bg-white shadow-md rounded-md p-4 overflow-y-auto transition duration-300 transform hover:shadow-lg hover:scale-105 hover:bg-gray-200 cursor-pointer">
                <embed
                  src={`data:${file.file_type};base64,${file.content}`}
                  className="w-full h-32 object-cover mb-2 rounded-md"
                />
                <p className="text-lg font-semibold truncate">{file.filename}</p>
                <button
                  onClick={() => handleFileClick(file)}
                  className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {file.file_type === 'application/pdf' && (
                  <button
                    className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                    title="AI Chatbot"
                    onClick={handleFileChatbot(file)}
                  >
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                )}
                {file.access_level === 'download' && (
                  <button
                    onClick={() => handleDownload(file)}
                    className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                )}
                <p className="text-sm text-gray-600">Owner: <span className="font-semibold">{file.owner}</span></p>
                <p className="text-sm text-gray-600">Access Level: <span className="font-semibold">{file.access_level}</span></p>
                <p className="text-sm text-gray-600">Shared Time: <span className="font-semibold">{file.shared_time}</span></p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Note: The file owner has shared this file with you and can revoke access at any time.
          </p>
          <FileDisplayModal isOpen={isFileDisplayModalOpen} onClose={() => setFileDisplayModalOpen(false)} selectedFile={selectedFile} />
          {showChatbotModal && (
            <FileChatbotModal
              isOpen={showChatbotModal}
              onClose={handleCloseChatbotModal}
              fileContent={selectedFile.content}
              fileId={selectedFile.id}
              fileName={selectedFile.filename}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SharedWithMe;
