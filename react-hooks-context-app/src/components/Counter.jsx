import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Counter</h2>
      <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>
        {count}
      </p>
      <div>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}
        >
          -
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ margin: '0 0.5rem', padding: '0.5rem 1rem' }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;