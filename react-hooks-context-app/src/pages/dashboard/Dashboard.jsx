import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', padding: '1rem' }}>
        <h3>Dashboard</h3>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/tasks">Tasks</Link>
          <Link to="/dashboard/counter">Counter</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;