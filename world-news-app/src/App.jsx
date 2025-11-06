import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [country, setCountry] = useState("et");
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsSource, setNewsSource] = useState("all");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSourceChange = (source) => {
    setNewsSource(source);
    setSearchQuery(""); // Clear search when changing source
  };

  return (
    <div className="app">
      <Navbar
        onCountryChange={setCountry}
        onCategoryChange={setCategory}
        onSearch={handleSearch}
        onSourceChange={handleSourceChange}
      />
      <Home 
        country={country} 
        category={category} 
        searchQuery={searchQuery}
        newsSource={newsSource}
      />
    </div>
  );
}

export default App;