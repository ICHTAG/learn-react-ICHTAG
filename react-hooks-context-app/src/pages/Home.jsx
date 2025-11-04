import React from 'react';
import OnlineStatus from '../components/OnlineStatus';
import Counter from '../components/Counter';
import TodoList from '../components/TodoList';

function Home() {
  return (
    <div className="page-container fade-in">
      <OnlineStatus />
      <h1 className="page-title">Home Page</h1>
      <p className="page-subtitle">Welcome to the React Hooks & Context App!</p>
      
      <div className="home-grid">
        <div className="grid-item">
          <Counter />
        </div>
        <div className="grid-item">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Home;