import React from 'react';
import { formatDate, truncateText } from '../../utils/helpers';
import { formatReadingTime } from '../../utils/formatters';

const NewsCard = ({ article, onClick }) => {
  const {
    title,
    description,
    urlToImage,
    publishedAt,
    source,
    content
  } = article;

  const handleClick = () => {
    if (onClick) {
      onClick(article);
    } else if (article.url) {
      window.open(article.url, '_blank');
    }
  };

  return (
    <article className="news-card" onClick={handleClick}>
      <div className="news-card-image">
        {urlToImage ? (
          <img src={urlToImage} alt={title} loading="lazy" />
        ) : (
          <div className="image-placeholder">📰</div>
        )}
      </div>
      
      <div className="news-card-content">
        <div className="news-meta">
          <span className="source">{source?.name || 'Unknown Source'}</span>
          <span className="date">{formatDate(publishedAt)}</span>
        </div>
        
        <h3 className="news-title">{truncateText(title, 80)}</h3>
        
        <p className="news-description">
          {truncateText(description || content || 'No description available', 120)}
        </p>
        
        <div className="news-footer">
          <span className="reading-time">
            {formatReadingTime(content || description || title)}
          </span>
          <button className="read-more-btn">Read More →</button>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;