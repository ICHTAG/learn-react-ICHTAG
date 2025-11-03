import React, { useState, useEffect } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Updated Todos:", todos);
  }, [todos]);

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  return (
    <div>
      <h2>📝 To-Do List</h2>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
