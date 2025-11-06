import React, { useState, useEffect } from "react";
import { getAvailableSources } from "../services/newsAPI";

function Navbar({ onCountryChange, onCategoryChange, onSearch, onSourceChange }) {
  const [selectedCountry, setSelectedCountry] = useState("et");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedSource, setSelectedSource] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsSources, setNewsSources] = useState([]);

  // Load available sources
  useEffect(() => {
    setNewsSources(getAvailableSources());
  }, []);

  const categories = [
    { value: "general", label: "🌐 General" },
    { value: "business", label: "💼 Business" },
    { value: "technology", label: "💻 Technology" },
    { value: "sports", label: "⚽ Sports" },
    { value: "health", label: "🏥 Health" },
    { value: "entertainment", label: "🎬 Entertainment" },
  ];

  const countries = [
    { code: "et", name: "🇪🇹 Ethiopia" },
    { code: "us", name: "🇺🇸 USA" },
    { code: "gb", name: "🇬🇧 UK" },
    { code: "za", name: "🇿🇦 South Africa" },
    { code: "ke", name: "🇰🇪 Kenya" },
    { code: "ng", name: "🇳🇬 Nigeria" },
  ];

  // Real-time search as you type
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim()) {
        onSearch(searchQuery.trim());
      } else if (searchQuery === "") {
        onSearch("");
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, onSearch]);

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setSelectedCountry(newCountry);
    onCountryChange(newCountry);
    setSearchQuery("");
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
    setSearchQuery("");
  };

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    setSelectedSource(newSource);
    onSourceChange(newSource);
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const popularSearches = [
    "BBC News", "CNN Breaking", "Al Jazeera", "Reuters", 
    "Ethiopia News", "Technology", "Sports", "Business"
  ];

  const handlePopularSearch = (term) => {
    setSearchQuery(term);
  };

  return (
    <nav>
      <div className="nav-container">
        {/* Breaking News Bar */}
        <div className="breaking-news-bar">
          <div className="breaking-label">🚨 BREAKING</div>
          <div className="breaking-text">
            <span>ICHTAG Global News - Direct from BBC, CNN, Al Jazeera, Reuters & Major Networks</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="nav-top-row">
          {/* Professional News Logo */}
          <div className="nav-logo">
            <div className="news-brand">
              <div className="brand-main">
                <span className="brand-name">ICHTAG</span>
                <span className="brand-global">GLOBAL NEWS</span>
              </div>
              <div className="brand-tagline">Direct from Major Networks</div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="🔍 Search news from BBC, CNN, Al Jazeera..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          {/* Date Display */}
          <div className="date-display">
            <div className="current-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Enhanced News Navigation */}
        <div className="news-navigation">
          <div className="nav-filters">
            <div className="filter-group">
              <span className="filter-label">Region:</span>
              <select 
                value={selectedCountry}
                onChange={handleCountryChange}
                className="country-select"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-label">Category:</span>
              <select 
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="category-select"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* News Source Selection */}
            <div className="filter-group">
              <span className="filter-label">Source:</span>
              <select 
                value={selectedSource}
                onChange={handleSourceChange}
                className="source-select"
              >
                {newsSources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Links */}
          <div className="quick-links">
            <div className="links-label">Networks:</div>
            <div className="links-buttons">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(term)}
                  className="link-button"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Source Description */}
        {selectedSource !== "all" && (
          <div className="source-description">
            <div className="source-info">
              📡 Now viewing: <strong>{newsSources.find(s => s.id === selectedSource)?.description}</strong>
            </div>
          </div>
        )}

        {/* Search Indicator */}
        {searchQuery && (
          <div className="search-indicator">
            <div className="indicator-content">
              <span className="indicator-icon">🔍</span>
              Searching across all networks: <strong>"{searchQuery}"</strong>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;