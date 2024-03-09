import React from 'react';

const FileDisplayModal = ({ isOpen, onClose, selectedFile }) => {

    if (!isOpen || !selectedFile) return null; // Add null check for the file object

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto">
                    <div className="bg-white max-w-6xl mx-auto p-4 rounded-lg">
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-8 rounded-md w-96 h-96 overflow-y-auto">
        {selectedFile && selectedFile.file_type === 'application/pdf' ? (
            <embed
                src={`data:${selectedFile.file_type};base64,${selectedFile.content}`}
                className="w-full h-full max-w-full max-h-full"
            />
        ) : (
            <img
                src={`data:${selectedFile.file_type};base64,${selectedFile.content}`}
                alt={selectedFile.name}
                className="w-full h-full max-w-full max-h-full"
            />
        )}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
            Close
        </button>
    </div>
</div>

                    </div>
                </div>
            )}
        </>
    );
};

export default FileDisplayModal;
