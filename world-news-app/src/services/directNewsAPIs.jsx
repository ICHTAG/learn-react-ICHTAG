import axios from "axios";

const API_KEYS = {
  newsapi: "e6bdb88aea37404e9c961ce584ad71dc", // Your current key
  guardian: "your_guardian_api_key", // Free tier available
  bingNews: "your_bing_news_key" // Free through Azure
};

// BBC News (through NewsAPI)
export const getBBCNews = async (category = "general") => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        sources: "bbc-news",
        apiKey: API_KEYS.newsapi,
        pageSize: 20
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("BBC News Error:", error);
    return [];
  }
};

// CNN News
export const getCNNNews = async (category = "general") => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        sources: "cnn",
        apiKey: API_KEYS.newsapi,
        pageSize: 20
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("CNN News Error:", error);
    return [];
  }
};

// Al Jazeera English
export const getAlJazeeraNews = async () => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        sources: "al-jazeera-english",
        apiKey: API_KEYS.newsapi,
        pageSize: 20
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("Al Jazeera Error:", error);
    return [];
  }
};

// Reuters
export const getReutersNews = async () => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        sources: "reuters",
        apiKey: API_KEYS.newsapi,
        pageSize: 20
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("Reuters Error:", error);
    return [];
  }
};

// Ethiopian News Sources
export const getEthiopianNews = async () => {
  try {
    // You can search for Ethiopian-related news
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "Ethiopia OR Addis Ababa",
        language: "en",
        sortBy: "publishedAt",
        apiKey: API_KEYS.newsapi,
        pageSize: 20
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("Ethiopian News Error:", error);
    return [];
  }
};

// Get news by specific broadcaster
export const getNewsBySource = async (sourceId) => {
  const sources = {
    bbc: "bbc-news",
    cnn: "cnn", 
    aljazeera: "al-jazeera-english",
    reuters: "reuters",
    fox: "fox-news",
    nbc: "nbc-news",
    abc: "abc-news",
    cbs: "cbs-news"
  };

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        sources: sources[sourceId] || sourceId,
        apiKey: API_KEYS.newsapi,
        pageSize: 20
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error(`Source ${sourceId} Error:`, error);
    return [];
  }
};