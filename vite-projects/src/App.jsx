import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  /*** Counter ***/
  const [count, setCount] = useState(0);

  /*** Form Input ***/
  const [name, setName] = useState("");

  /*** Todo List ***/
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  /*** Theme Toggle ***/
  const [darkMode, setDarkMode] = useState(false);

  // Update document title with count
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Add task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  // Delete task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""} style={{ minHeight: "100vh", padding: "20px" }}>
      <h1>🔥 React Hooks Playground</h1>

      {/* Theme Toggle */}
      <section>
        <h2>Theme Toggle</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </section>

      {/* Counter */}
      <section>
        <h2>Counter</h2>
        <h3>{count}</h3>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </section>

      {/* Form Input */}
      <section>
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
      <section>
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
              <button onClick={() => deleteTask(index)} style={{ backgroundColor: "#f44336" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
