import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo, 
        completed: false 
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Todo List</h2>
      
      <div style={{ marginBottom: '1rem', display: 'flex' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          style={{ 
            flex: 1, 
            padding: '0.5rem',
            marginRight: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            style={{ 
              padding: '0.5rem',
              margin: '0.5rem 0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              textDecoration: todo.completed ? 'line-through' : 'none',
              backgroundColor: todo.completed ? '#f0f0f0' : 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;