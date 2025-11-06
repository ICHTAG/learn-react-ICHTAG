import React from 'react'

function App() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#4f46e5', fontSize: '2.5rem', marginBottom: '20px' }}>
        🌍 World News App
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>
        React is working! Your app is ready.
      </p>
      <div style={{ 
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <h3 style={{ color: '#374151', marginBottom: '15px' }}>✅ Success!</h3>
        <p style={{ color: '#059669', fontWeight: 'bold' }}>
          Your React app is running correctly
        </p>
      </div>
    </div>
  )
}

export default App