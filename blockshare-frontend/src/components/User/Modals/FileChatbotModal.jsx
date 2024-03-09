import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_API } from '../../../services/Config';
import Markdown from "marked-react";

const FileChatbotModal = ({ isOpen, onClose, fileContent, fileId,fileName }) => {
    const [inputPrompt, setInputPrompt] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [userQuestions, setUserQuestions] = useState([]);
    const [aiResponses, setAIResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    

    const chatHistoryRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat history whenever it updates
      
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [userQuestions, aiResponses]);

    // Function to handle input change
    const handleInputChange = (e) => {
        setInputPrompt(e.target.value);
        // Activate the button if the input prompt is not empty
        setIsButtonActive(e.target.value.trim() !== '');
    };

    // Function to handle button click
    const handleButtonClick = async () => {
        // Add the user's message to the user questions list
        setUserQuestions([...userQuestions, inputPrompt]);

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('user_question', inputPrompt);
            formData.append('pdf_content', fileContent); // Assuming fileContent is the PDF file content

            const response = await axios.post(`${BASE_API}/api/process`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Add the chatbot's response to the AI responses list
            setAIResponses([...aiResponses, response.data.result]);
        } catch (error) {
            console.error('Error processing user question:', error);
            // Handle error, if any
        }

        setIsLoading(false);
        // Clear the input prompt after submission
        setInputPrompt('');
    };

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Generative AI Chatbot</h2>
                        <p className="text-sm text-gray-900 font-bold mb-2">File Name: {fileName}</p>
                        <p className="text-sm text-gray-600 mb-4">This chatbot provides insights and answers related to the file content.</p>
                        {userQuestions.length === 0 && aiResponses.length === 0 && (
                            <div className="mb-2">
                                <div className="bg-blue-100 text-blue-900 p-2 rounded-lg mb-2">
                                    <p>AI Capabilities:</p>
                                    {/* Add content about AI capabilities */}
                                    <ul className="list-disc pl-5">
                                        <li>Extracting insights from PDF content</li>
                                        <li>Providing detailed responses based on user queries</li>
                                        <li>Offering suggestions for better queries</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-100 text-gray-900 p-2 rounded-lg">
                                    <p>User Capabilities:</p>
                                    {/* Add content about user capabilities */}
                                    <ul className="list-disc pl-5">
                                        <li>Ask questions related to the PDF content</li>
                                        <li>Receive detailed responses and insights</li>
                                        <li>Improve query quality for better results</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        <div className="max-h-80 overflow-y-auto" ref={chatHistoryRef}>
                            {/* Display user questions and AI responses */}
                            {userQuestions.map((question, index) => (
                                <div key={index} className="text-left">
                                    <p className="text-left bg-blue-100 text-blue-900 p-2 rounded-lg mb-2">YOU: {question}</p>
                                    {aiResponses[index] && <p className="text-left bg-gray-100 text-gray-900 p-2 rounded-lg mb-2">AI: </p>}
                                    <Markdown>{aiResponses[index]}</Markdown>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-4">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Type your prompt here"
                                value={inputPrompt}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className={`ml-3 inline-flex justify-center w-20 rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white ${isButtonActive ? 'hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'bg-gray-300 cursor-not-allowed'}`}
                                onClick={handleButtonClick}
                                disabled={!isButtonActive}
                            >
                                {isLoading ? <span>Loading...</span> : <span>Submit</span>}
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-gray-700 ml-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileChatbotModal;
