import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ 
      padding: "1rem", 
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "1rem" }}>About</Link>
        {user && (
          <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
        )}
      </div>
      
      <div>
        <button onClick={toggleTheme} style={{ marginRight: "1rem" }}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;