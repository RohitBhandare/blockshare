import React, { useState, useEffect } from 'react';
import FileService from '../../services/FileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShare, faInfoCircle, faEye, faRobot, faCloudArrowDown, faMessage, faTrash } from '@fortawesome/free-solid-svg-icons';

import FileDisplayModal from './Modals/FileDisplayModal';
import ShareModal from './Modals/ShareModal';
import FileChatbotModal from './Modals/FileChatbotModal';

const Files = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [sharingFileId, setSharingFileId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showChatbotModal, setShowChatbotModal] = useState(false);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await FileService.getAllFiles(userData.id);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userData.id]);

    const handleShareIconClick = (fileId) => {
        setShowModal(true);
        setSharingFileId(fileId);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShareFile = (username, accessControl) => {
        console.log('Sharing file', sharingFileId, 'from user', userData.id, 'with username:', username, 'and access control:', accessControl);

        FileService.shareFile(sharingFileId, userData.id, username, accessControl)
            .then((response) => {
                console.log('File shared successfully:', response);
                alert('File shared successfully');
            })
            .catch((error) => {
                console.error('Error sharing file:', error.message);
                alert('File sharing failed');
            });

        handleCloseModal();
    };

    const handleFileClick = (file) => {
        setSelectedFile(file);
        setShowModal(true);
    };

    const handleFileChatbot = (file) => () => {
        setSelectedFile(file);
        setShowChatbotModal(true);
    };

    const handleCloseChatbotModal = () => {
        setShowChatbotModal(false);
    };
    const handleDeleteFile = async (file) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            try {
                await FileService.deleteFile(file.id);
                setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
                alert('File deleted successfully');
            } catch (error) {
                console.error('Error deleting file:', error.message);
                alert('File deletion failed');
            }
        }
    };

    const handleDownloadFile = (file) => {
        // Convert base64 data to blob
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
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };
    


    return (
        <div className="container mx-auto px-2 py-4">
            <h2 className="text-3xl font-bold mb-4">All Files</h2>
            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : (
                <>
                    {!files || files.length === 0 ? (
                        <div className="text-center text-gray-600">
                            No files available. <br />
                            Upload your photos now to experience secure, decentralized, and blockchain-backed storage!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {files.map((file, index) => (
                                <div key={index} className="bg-gray-100 shadow-md rounded-md p-4 overflow-y-auto transition duration-300 transform hover:shadow-lg hover:scale-105 hover:bg-gray-200 cursor-pointer">
                                    <embed src={`data:${file.file_type};base64,${file.content}`} className="w-full h-32 object-cover mb-2 rounded-md" />
                                    <p className="text-lg font-semibold truncate">{file.name}</p>
                                    <div className="flex justify-between mt-2">
                                        <button
                                            className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                                            title="Download File"
                                            onClick={() => handleDownloadFile(file)}
                                        >
                                            <FontAwesomeIcon icon={faCloudArrowDown} />
                                        </button>


                                        <button
                                            onClick={() => handleShareIconClick(file.hash)}
                                            className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                                            title="Share File"
                                        >
                                            <FontAwesomeIcon icon={faShare} />
                                        </button>

                                        <button
                                            className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                                            title="File Information"
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} />
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

                                        <button
                                            onClick={() => handleFileClick(file)}
                                            className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                                            title="View File"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteFile(file)}
                                            className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105"
                                            title="Delete File"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
            <FileDisplayModal isOpen={showModal} onClose={handleCloseModal} selectedFile={selectedFile} />
            <ShareModal isOpen={showModal} onClose={handleCloseModal} onShare={handleShareFile} senderId={userData.id} />
            {showChatbotModal && (
                <FileChatbotModal
                    isOpen={showChatbotModal}
                    onClose={handleCloseChatbotModal}
                    fileContent={selectedFile.content}
                    fileId={selectedFile.id}
                    fileName={selectedFile.name}
                />
            )}
        </div>
    );
};

export default Files;
