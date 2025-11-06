import { useState, useEffect } from 'react';
import { AuthService } from '../../services/authService';
import { NewsService } from '../../services/newsService';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import NewsGrid from '../news/NewsGrid';
import CategoryFilter from '../news/CategoryFilter';
import LoadingSpinner from '../common/LoadingSpinner';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    if (user?.preferences?.categories) {
      setSelectedCategory(user.preferences.categories[0]);
    }
    loadNews();
  }, []);

  useEffect(() => {
    loadNews();
  }, [selectedCategory]);

  const loadNews = async () => {
    setLoading(true);
    try {
      const newsData = await NewsService.getNews(selectedCategory);
      setNews(newsData);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      loadNews();
    } else {
      setLoading(true);
      try {
        const searchResults = await NewsService.searchNews(query);
        setNews(searchResults);
      } catch (error) {
        console.error('Error searching news:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    AuthService.updateUserPreferences({
      categories: [category, ...(currentUser?.preferences?.categories || [])]
    });
  };

  if (!currentUser) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard">
      <Header 
        user={currentUser}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      
      <main className="news-container">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="welcome-subtitle">
            {searchQuery 
              ? `Search results for "${searchQuery}"` 
              : 'Stay updated with the latest news from around the world'
            }
          </p>
        </div>

        {!searchQuery && (
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {loading ? (
          <LoadingSpinner message={searchQuery ? "Searching news..." : "Loading news..."} />
        ) : (
          <>
            <NewsGrid news={news} />
            {news.length === 0 && (
              <div className="empty-state">
                <h3>No news found</h3>
                <p>
                  {searchQuery 
                    ? `No results found for "${searchQuery}". Try different keywords.`
                    : 'No news available in this category at the moment.'
                  }
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;