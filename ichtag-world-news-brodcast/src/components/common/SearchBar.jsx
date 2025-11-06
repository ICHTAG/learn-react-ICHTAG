import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search for news..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-submit-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;