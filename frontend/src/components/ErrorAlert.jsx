import React from 'react';

const ErrorAlert = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{message}</span>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Close"
        >
          <span className="text-red-500">&times;</span>
        </button>
      )}
    </div>
  );
};

export default ErrorAlert; 