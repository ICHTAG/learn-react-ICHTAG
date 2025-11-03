import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Update document title
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>{" "}
      <button onClick={() => setCount(count - 1)}>Decrement</button>{" "}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
