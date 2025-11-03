import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Tabs and persistence
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "counter");
  const [count, setCount] = useState(Number(localStorage.getItem("count")) || 0);
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // Persist states
  useEffect(() => { localStorage.setItem("count", count); document.title = `Count: ${count}`; }, [count]);
  useEffect(() => { localStorage.setItem("name", name); }, [name]);
  useEffect(() => { localStorage.setItem("tasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("darkMode", darkMode); }, [darkMode]);
  useEffect(() => { localStorage.setItem("activeTab", activeTab); }, [activeTab]);

  // Add task
  const addTask = () => { if (task.trim()) { setTasks([...tasks, task]); setTask(""); } };

  // Delete task
  const deleteTask = (index) => { setTasks(tasks.filter((_, i) => i !== index)); };

  // Drag-and-drop reorder
  const dragStart = (e, index) => e.dataTransfer.setData("taskIndex", index);
  const dragOver = (e) => e.preventDefault();
  const drop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData("taskIndex");
    const temp = [...tasks];
    const [dragged] = temp.splice(dragIndex, 1);
    temp.splice(dropIndex, 0, dragged);
    setTasks(temp);
  };

  // Render active tab
  const renderTab = () => {
    switch (activeTab) {
      case "counter":
        return (
          <section className="fade-in">
            <h2>Counter</h2>
            <h3>{count}</h3>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </section>
        );
      case "form":
        return (
          <section className="fade-in">
            <h2>Form Input</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Hello, {name || "stranger"}!</p>
          </section>
        );
      case "todo":
        return (
          <section className="fade-in">
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
                <li
                  key={index}
                  draggable
                  onDragStart={(e) => dragStart(e, index)}
                  onDragOver={dragOver}
                  onDrop={(e) => drop(e, index)}
                >
                  {t}{" "}
                  <button onClick={() => deleteTask(index)} style={{ backgroundColor: "#f44336" }}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      case "theme":
        return (
          <section className="fade-in">
            <h2>Theme Toggle</h2>
            <button onClick={() => setDarkMode(!darkMode)}>
              Switch to {darkMode ? "Light" : "Dark"} Mode
            </button>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : ""} style={{ minHeight: "100vh", padding: "20px" }}>
      <h1>🔥 Professional React Dashboard</h1>

      {/* Tabs Navigation */}
      <nav className="tabs-nav">
        {["counter","form","todo","theme"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Active Tab */}
      {renderTab()}
    </div>
  );
}

export default App;
