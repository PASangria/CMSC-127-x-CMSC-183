// components/CloseButton.jsx
import React from 'react';
import { X } from "react-feather";

const CloseButton = ({ onClick }) => {
  return (
    <div className="absolute top-2 right-2 z-10">
      <button
        onClick={onClick}
        className="p-1 rounded-full text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-600 transition duration-150"
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CloseButton;
