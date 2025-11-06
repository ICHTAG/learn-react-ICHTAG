import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CATEGORIES, COUNTRIES } from '../../utils/constants';
import { formatCategoryName } from '../../utils/formatters';

const Header = ({ 
  currentCategory, 
  onCategoryChange, 
  currentCountry, 
  onCountryChange,
  onSearch 
}) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Brand */}
        <div className="brand">
          <h1>🌍 World News</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        {/* Category Filter */}
        <nav className="category-nav">
          {Object.values(CATEGORIES).map(category => (
            <button
              key={category}
              className={`category-btn ${currentCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </nav>

        {/* Country Selector and User Menu */}
        <div className="header-controls">
          <select
            value={currentCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="country-select"
          >
            {Object.entries(COUNTRIES).map(([key, value]) => (
              <option key={value} value={value}>
                {key.toUpperCase()}
              </option>
            ))}
          </select>

          {user && (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                👤 {user.name}
              </button>
              
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;