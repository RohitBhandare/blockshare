import React, { useState, useEffect } from 'react';
import FileService from '../../services/FileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShare, faInfoCircle, faEye } from '@fortawesome/free-solid-svg-icons';

import ShareModal from './Modals/ShareModal';

const Photos = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [sharingFileId, setSharingFileId] = useState(null); // State to store the fileId for sharing
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
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
        setSharingFileId(fileId); // Store the fileId for sharing
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShareFile = (username, accessControl) => {
        console.log('Sharing file', sharingFileId, 'from user', userData.id, 'with username:', username, 'and access control:', accessControl);
        
        // Call the shareFile function from the FileService
        FileService.shareFile(sharingFileId, userData.id, username, accessControl)
            .then((response) => {
                console.log('File shared successfully:', response);
                alert('File shared successfully');
            })
            .catch((error) => {
                console.error('Error sharing file:', error.message);
                alert('File sharing failed');
            });

        // Close the modal after sharing
        handleCloseModal();
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setImageModalOpen(true);
    };

    return (
        <div className="container mx-auto px-2 py-4">
            <h2 className="text-3xl font-bold mb-4">All Photos</h2>
            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : (
                <>
                    {!files || files.length === 0 ? (
                        <div className="text-center text-gray-600">
                            No photos available. <br />
                            Upload your photos now to experience secure, decentralized, and blockchain-backed storage!
                        </div>
                    ) : (
                        <div className="photos-container ">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {files.map((file, index) => {
                                 
                                    if (file.file_type === 'image/jpeg' || file.file_type === 'image/png') {
                                        return (
                                            <div key={index} className="bg-gray-100  shadow-md rounded-md p-4 overflow-y-auto transition duration-300 transform hover:shadow-lg hover:scale-105 hover:bg-gray-200 cursor-pointer">
                                                <img src={`data:image/jpeg;base64,${file.content}`} alt="" className="w-full h-32 object-cover mb-2 rounded-md cursor-pointer" onClick={() => handleImageClick(`data:image/jpeg;base64,${file.content}`)} />
                                                <p className="text-lg font-semibold">{file.name}</p>
                                                <div className="flex justify-between mt-2">
                                                    <button className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105">
                                                        <FontAwesomeIcon icon={faDownload} />
                                                    </button>
                                                    <button onClick={() => handleShareIconClick(file.hash)} className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105">
                                                        <FontAwesomeIcon icon={faShare} />
                                                    </button>
                                                    <button className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105">
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                    </button>
                                                    <button className="text-gray-800 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-400 transition duration-300 transform hover:scale-105">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return null; // Skip rendering if the file type is not "image/jpeg" or "image/png"
                                    }
                                })}
                            </div>
                        </div>
                    )}
                    {isImageModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-8 rounded-md w-96 h-96 overflow-y-auto ">
                                <img src={selectedImage} alt="" className="w-full h-full max-w-full max-h-full" />
                                <button onClick={() => setImageModalOpen(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Close</button>
                            </div>
                        </div>
                    )}
                    <ShareModal isOpen={showModal} onClose={handleCloseModal} onShare={handleShareFile} senderId={userData.id} />
                </>
            )}
        </div>
    );
};

export default Photos;
