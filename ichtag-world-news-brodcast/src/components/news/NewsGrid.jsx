import React from 'react';
import NewsCard from './NewsCard';
import LoadingSpinner from '../common/LoadingSpinner';

const NewsGrid = ({ news, loading, error, onNewsClick }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>⚠️ Error Loading News</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="empty-state">
        <h3>📰 No News Found</h3>
        <p>Try changing your search criteria or category</p>
      </div>
    );
  }

  return (
    <div className="news-grid">
      {news.map((article, index) => (
        <NewsCard
          key={article.url || index}
          article={article}
          onClick={() => onNewsClick(article)}
        />
      ))}
    </div>
  );
};

export default NewsGrid;