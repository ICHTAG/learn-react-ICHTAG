import React, { useState, useEffect } from "react";

// Main App
function Apps() {
  /*** 1️ Counter ***/
  const [count, setCount] = useState(0);

  /*** 2 Form Input ***/
  const [name, setName] = useState("");

  /*** 3 Todo List ***/
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  /*** 4Toggle Theme ***/
  const [darkMode, setDarkMode] = useState(false);

  /*** Bonus: useEffect Example ***/
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Update document title when count changes

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: darkMode ? "#1a1a1a" : "#f2f2f2",
        color: darkMode ? "#fff" : "#000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🔥 React Hooks Playground</h1>

      {/* Counter */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increment</button>{" "}
        <button onClick={() => setCount(count - 1)}>Decrement</button>{" "}
        <button onClick={() => setCount(0)}>Reset</button>
      </section>

      {/* Form Input */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Form Input</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Hello, {name || "stranger"}!</p>
      </section>

      {/* Todo List */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Todo List</h2>
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((t, index) => (
            <li key={index}>
              {t}{" "}
              <button
                style={{ color: "red", marginLeft: "10px" }}
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Toggle Theme */}
      <section>
        <h2>Theme: {darkMode ? "Dark" : "Light"}</h2>
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
      </section>
    </div>
  );
}

export default Apps;
