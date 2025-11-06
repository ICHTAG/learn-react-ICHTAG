import { useState, useEffect } from 'react';
import { newsService } from '../services/newsService';
import { CATEGORIES, NEWS_SOURCES } from '../utils/constants';

export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(CATEGORIES.ALL);
  const [source, setSource] = useState(NEWS_SOURCES.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'source'

  const fetchNews = async (currentCategory = category, currentSource = source, currentSearch = searchQuery) => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      
      if (currentSearch) {
        // Search across all news
        const sources = currentSource === NEWS_SOURCES.ALL ? ['all'] : [currentSource];
        data = await newsService.searchNews(currentSearch, sources);
      } else if (currentSource === NEWS_SOURCES.ALL) {
        // Get all headlines
        data = await newsService.getTopHeadlines(['all'], currentCategory);
      } else {
        // Get by specific source
        data = await newsService.getNewsBySource(currentSource);
      }
      
      if (data.status === 'ok') {
        setNews(data.articles);
      } else {
        throw new Error(data.message || 'Failed to fetch news');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery('');
    fetchNews(newCategory, source);
  };

  const handleSourceChange = (newSource) => {
    setSource(newSource);
    setSearchQuery('');
    fetchNews(category, newSource);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      fetchNews(category, source, query);
    } else {
      fetchNews(category, source);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    fetchNews(category, source);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    category,
    source,
    searchQuery,
    viewMode,
    setCategory: handleCategoryChange,
    setSource: handleSourceChange,
    searchNews: handleSearch,
    clearSearch,
    setViewMode,
    refetch: () => fetchNews()
  };
};