import React from "react";
import "./App.css";
import Clock from "./Clock";
import Users from "./Users";
import Todo from "./Todo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🌑 ICH’s React Dashboard</h1>
        <Clock />
        <Users />
        <Todo />
      </header>
    </div>
  );
}

export default App;
