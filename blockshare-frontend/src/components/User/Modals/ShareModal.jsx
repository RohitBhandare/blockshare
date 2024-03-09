import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../../services/UserService';

const ShareModal = ({ isOpen, onClose, onShare, fileId, senderId }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [accessControl, setAccessControl] = useState('read');
    const [userData, setUserData] = useState([]);
    const [suggestedUsernames, setSuggestedUsernames] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await UserService.getUser();
                setUserData(response);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);

        if (value.trim() === '') {
            setSuggestedUsernames([]);
        } else {
            const filteredUsernames = userData.data.filter(user => user.username.toLowerCase().startsWith(value.toLowerCase()));
            setSuggestedUsernames(filteredUsernames);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setUsername(suggestion.username);
        setSuggestedUsernames([]);
    };

    const handleAccessControlChange = (event) => {
        setAccessControl(event.target.value);
    };

    const handleShareFile = () => {
        onShare(username, accessControl);
        setUsername('');
        setEmail('');
        setAccessControl('read');
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-md">
                        <div className="flex justify-end mb-4">
                            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold mb-4">Share File</h2>
                        <div className="mb-4 relative">
                            <label className="block mb-1">Username:</label>
                            <input type="text" value={username} onChange={handleUsernameChange} className="border border-gray-400 rounded-md px-3 py-2 w-full" />
                            {suggestedUsernames.length > 0 && (
                                <ul className="absolute bg-white w-full border border-gray-300 rounded-b-md shadow-lg mt-1">
                                    {suggestedUsernames.map((user, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(user)}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                                        >
                                            <div>
                                                <span className="font-bold">{user.username}</span>
                                                <br />
                                                <span className="text-sm text-gray-500 font-bold">{user.email}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Access Control:</label>
                            <select value={accessControl} onChange={handleAccessControlChange} className="border border-gray-400 rounded-md px-3 py-2 w-full">
                                <option value="read">Read</option>
                                <option value="write">Write</option>
                                <option value="download">Download</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleShareFile} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Share</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareModal;
