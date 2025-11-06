import React from "react";

function NewsCard({ article, isEthiopianNews = false }) {
  // Truncate long descriptions
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "16px",
      background: "#ffffff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      height: "fit-content",
      display: "flex",
      flexDirection: "column"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
    }}
    >
      {/* News Image */}
      {article.urlToImage ? (
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <img
            src={article.urlToImage}
            alt={article.title}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {isEthiopianNews && (
            <span style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              background: "linear-gradient(135deg, #FF416C, #FF4B2B)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: "bold"
            }}>
              🇪🇹 Ethiopia
            </span>
          )}
        </div>
      ) : (
        <div style={{
          width: "100%",
          height: "200px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1rem",
          marginBottom: "12px"
        }}>
          📰 No Image
        </div>
      )}

      {/* News Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Source and Date */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
          fontSize: "0.8rem",
          color: "#666"
        }}>
          <span style={{
            background: "#f0f0f0",
            padding: "2px 8px",
            borderRadius: "4px",
            fontWeight: "500"
          }}>
            {article.source?.name || "Unknown Source"}
          </span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        {/* Title */}
        <h3 style={{
          margin: "0 0 12px 0",
          fontSize: "1.1rem",
          lineHeight: "1.4",
          color: "#333",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {article.title}
        </h3>

        {/* Description - NOW UNDER THE IMAGE */}
        <p style={{
          margin: "0 0 16px 0",
          color: "#555",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {truncateDescription(article.description)}
        </p>

        {/* Read More Link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#007bff",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "auto"
          }}
        >
          Read full article →
        </a>
      </div>
    </div>
  );
}

export default NewsCard;