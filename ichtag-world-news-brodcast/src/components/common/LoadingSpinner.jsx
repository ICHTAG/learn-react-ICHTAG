import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading news...' }) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default LoadingSpinner;