import axios from "axios";

const API_KEY = "e6bdb88aea37404e9c961ce584ad71dc";
const BASE_URL = "https://newsapi.org/v2";

// Major News Sources Available through NewsAPI
const NEWS_SOURCES = {
  bbc: "bbc-news",
  cnn: "cnn",
  aljazeera: "al-jazeera-english", 
  reuters: "reuters",
  associatedpress: "associated-press",
  foxnews: "fox-news",
  nbc: "nbc-news",
  abc: "abc-news",
  cbs: "cbs-news",
  bloomberg: "bloomberg",
  espn: "espn",
  techcrunch: "techcrunch"
};

// Get top headlines from all sources
export const getTopHeadlines = async (country = "et", category = "general") => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        category,
        apiKey: API_KEY,
        pageSize: 20
      },
      timeout: 10000
    });
    return response.data.articles || [];
  } catch (error) {
    console.error("API Error:", error.message);
    return [];
  }
};

// Search news by keyword
export const searchNews = async (query, sortBy = "publishedAt") => {
  if (!query || query.trim() === "") {
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        sortBy: sortBy,
        language: "en",
        apiKey: API_KEY,
        pageSize: 20
      },
      timeout: 10000
    });

    return response.data.articles || [];
  } catch (error) {
    console.error("Search API Error:", error.message);
    return [];
  }
};

// Get news from specific broadcasting corporation
export const getNewsFromSource = async (sourceId, category = "general") => {
  try {
    const sourceKey = NEWS_SOURCES[sourceId] || sourceId;
    
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        sources: sourceKey,
        apiKey: API_KEY,
        pageSize: 20,
        category: category !== "general" ? category : undefined
      },
      timeout: 10000
    });

    console.log(`📡 News from ${sourceId}:`, response.data.articles?.length);
    return response.data.articles || [];
  } catch (error) {
    console.error(`Source ${sourceId} Error:`, error.message);
    return [];
  }
};

// Get all available sources
export const getAvailableSources = () => {
  return [
    { id: "all", name: "📰 All Sources", description: "All news sources" },
    { id: "bbc", name: "🇬🇧 BBC News", description: "British Broadcasting Corporation" },
    { id: "cnn", name: "🇺🇸 CNN", description: "Cable News Network" },
    { id: "aljazeera", name: "🇶🇦 Al Jazeera", description: "Al Jazeera English" },
    { id: "reuters", name: "🌍 Reuters", description: "Reuters News" },
    { id: "associatedpress", name: "🇺🇸 Associated Press", description: "AP News" },
    { id: "foxnews", name: "🇺🇸 Fox News", description: "Fox News Network" },
    { id: "nbc", name: "🇺🇸 NBC News", description: "National Broadcasting Company" },
    { id: "abc", name: "🇺🇸 ABC News", description: "American Broadcasting Company" },
    { id: "cbs", name: "🇺🇸 CBS News", description: "Columbia Broadcasting System" },
    { id: "bloomberg", name: "💼 Bloomberg", description: "Bloomberg News" },
    { id: "espn", name: "⚽ ESPN", description: "Entertainment and Sports Programming" },
    { id: "techcrunch", name: "💻 TechCrunch", description: "Technology News" },
  ];
};