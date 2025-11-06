import React, { useState, useEffect } from "react";
import { getTopHeadlines, searchNews, getNewsFromSource } from "../services/newsAPI";
import NewsCard from "../components/NewsCard";

function Home({ country, category, searchQuery, newsSource }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSource, setCurrentSource] = useState("All Sources");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data = [];

        if (searchQuery) {
          // Search across all sources
          console.log(`🔍 Searching for: "${searchQuery}"`);
          data = await searchNews(searchQuery);
          setCurrentSource("All Sources");
        } else if (newsSource && newsSource !== "all") {
          // Get news from specific source
          console.log(`📡 Getting news from: ${newsSource}`);
          data = await getNewsFromSource(newsSource, category);
          
          // Set current source name for display
          const sources = {
            bbc: "BBC News",
            cnn: "CNN",
            aljazeera: "Al Jazeera English",
            reuters: "Reuters",
            associatedpress: "Associated Press",
            foxnews: "Fox News",
            nbc: "NBC News",
            abc: "ABC News",
            cbs: "CBS News",
            bloomberg: "Bloomberg",
            espn: "ESPN",
            techcrunch: "TechCrunch"
          };
          setCurrentSource(sources[newsSource] || newsSource);
        } else {
          // Regular headlines from all sources
          console.log(`📰 Getting ${category} news from ${country}`);
          data = await getTopHeadlines(country, category);
          setCurrentSource("Multiple Sources");
        }

        if (data && data.length > 0) {
          setArticles(data);
        } else {
          setError(`No articles found from ${currentSource}. Try a different source or search term.`);
          setArticles([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load news. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [country, category, searchQuery, newsSource]);

  const getCountryName = (code) => {
    const countries = {
      et: "Ethiopia", us: "USA", gb: "UK", 
      za: "South Africa", ng: "Nigeria", ke: "Kenya"
    };
    return countries[code] || code.toUpperCase();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-icon pulse-animation">
          {searchQuery ? "🔍" : "📰"}
        </div>
        <h3 className="loading-title">
          {searchQuery 
            ? `Searching for "${searchQuery}"...`
            : `Loading ${category} news from ${currentSource}...`
          }
        </h3>
        <p className="loading-subtitle">
          Fetching latest headlines from major networks...
        </p>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="error-container">
        <div className="error-icon">📰</div>
        <h3 className="error-title">News Update</h3>
        <p className="error-message">{error}</p>
        <div className="error-suggestions">
          <p>Try selecting a different news source or searching for specific topics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Enhanced Header */}
      <div className="home-header">
        {searchQuery ? (
          <>
            <h2 className="home-title">
              🔍 Search Results
            </h2>
            <p className="home-subtitle">
              Results for: <strong style={{ color: "#dc2626" }}>"{searchQuery}"</strong>
            </p>
            <p className="home-meta">
              Found {articles.length} articles across all networks
            </p>
          </>
        ) : (
          <>
            <h2 className="home-title">
              📰 {category.charAt(0).toUpperCase() + category.slice(1)} News
            </h2>
            <p className="home-subtitle">
              From: <strong style={{ color: "#dc2626" }}>{currentSource}</strong>
              {country !== "all" && ` • ${getCountryName(country)}`}
            </p>
            <p className="home-meta">
              {articles.length} latest headlines
            </p>
          </>
        )}
        
        {error && articles.length > 0 && (
          <div className="warning-banner">
            <span className="warning-text">
              ⚡ {error}
            </span>
          </div>
        )}
      </div>
      
      {/* News Grid */}
      <div className="news-grid">
        {articles.map((article, index) => (
          <NewsCard 
            key={index} 
            article={article} 
            showSource={true}
            isEthiopianNews={
              article.title?.toLowerCase().includes('ethiopia') ||
              article.description?.toLowerCase().includes('ethiopia') ||
              country === "et"
            }
          />
        ))}
      </div>

      {/* Network Information */}
      {articles.length > 0 && !searchQuery && (
        <div className="network-info">
          <div className="info-content">
            <h4>🌐 News Network</h4>
            <p>You're viewing content from <strong>{currentSource}</strong>. 
            Use the source selector above to switch between major news networks like BBC, CNN, Al Jazeera, and Reuters.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;