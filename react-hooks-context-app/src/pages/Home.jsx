import React from 'react';
import OnlineStatus from '../components/OnlineStatus';
import Counter from '../components/Counter';
import TodoList from '../components/TodoList';

function Home() {
  return (
    <div>
      <OnlineStatus />
      <h1>Home Page</h1>
      <p>Welcome to the React Hooks & Context App!</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        marginTop: '2rem'
      }}>
        <div>
          <Counter />
        </div>
        <div>
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Home;