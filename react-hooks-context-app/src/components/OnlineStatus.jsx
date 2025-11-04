import React, { useState, useEffect } from 'react';

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '5px 10px',
      backgroundColor: isOnline ? '#4CAF50' : '#f44336',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}

export default OnlineStatus;