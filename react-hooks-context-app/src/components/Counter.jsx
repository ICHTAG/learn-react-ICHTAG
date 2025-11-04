import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="fade-in">
      <h2>Counter</h2>
      <div className="counter-display">{count}</div>
      <div className="counter-buttons">
        <button 
          onClick={() => setCount(count - 1)}
          className="counter-btn primary"
        >
          -
        </button>
        <button 
          onClick={() => setCount(0)}
          className="counter-btn secondary"
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="counter-btn primary"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;