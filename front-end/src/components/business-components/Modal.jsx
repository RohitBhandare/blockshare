import React from 'react';

const Modal = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white p-8 rounded-lg max-w-lg w-full">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          Close
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
