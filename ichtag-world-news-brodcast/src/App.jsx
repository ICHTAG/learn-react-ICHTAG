// src/App.jsx - Complete Working Version
import React, { useState, useContext } from 'react';
import { CATEGORIES, APP_CONFIG } from './utils/constants';
import { formatCategoryName } from './utils/formatters';
import { authService } from './services/authService';
import './index.css';

// Create Auth Context
const AuthContext = React.createContext();

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const newUser = await authService.signup(userData);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Check for existing session on app start
  React.useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Login Form Component
const LoginForm = ({ onSwitchToSignup }) => {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData.email, formData.password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <h2 className="auth-title">Login to {APP_CONFIG.TITLE}</h2>
      <p className="auth-subtitle">
        Welcome back! Please enter your details
      </p>
      
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="auth-button"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-switch">
        Don't have an account?{' '}
        <button 
          type="button"
          onClick={onSwitchToSignup}
          className="auth-switch-btn"
        >
          Sign up here
        </button>
      </div>
    </div>
  );
};

// Signup Form Component
const SignupForm = ({ onSwitchToLogin }) => {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await signup(formData);
    if (result.success) {
      setSuccess('Account created successfully!');
    } else {
      setError(result.error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">
        Join {APP_CONFIG.TITLE} to stay informed
      </p>
      
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password (min 6 characters)"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="auth-button"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-switch">
        Already have an account?{' '}
        <button 
          type="button"
          onClick={onSwitchToLogin}
          className="auth-switch-btn"
        >
          Sign in here
        </button>
      </div>
    </div>
  );
};

// Auth Page Component
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-logo">{APP_CONFIG.LOGO}</div>
            <h1 className="auth-title">{APP_CONFIG.TITLE}</h1>
            <p className="auth-subtitle">{APP_CONFIG.TAGLINE}</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {activeTab === 'login' ? (
            <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
          )}

          <div className="demo-account">
            <div className="demo-title">Demo Account</div>
            <p className="demo-credentials">
              Use this demo account to test the app:<br />
              <strong>Email:</strong> demo@news.com<br />
              <strong>Password:</strong> demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Premium Header Component
const PremiumHeader = ({ currentCategory, onCategoryChange }) => {
  const { user, logout } = useAuth();

  return (
    <header className="broadcasting-header">
      <div className="header-container">
        <div className="header-main">
          <div className="brand-container">
            <div className="brand-logo">{APP_CONFIG.LOGO}</div>
            <div className="brand-content">
              <h1 className="brand-title">{APP_CONFIG.TITLE}</h1>
              <p className="brand-tagline">{APP_CONFIG.TAGLINE}</p>
            </div>
          </div>

          <div className="live-status">
            <div className="live-dot"></div>
            <span>LIVE BROADCASTING</span>
          </div>

          <div className="user-info">
            <span className="welcome-text">Welcome, {user?.name}!</span>
            <button className="logout-btn" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>

        {/* News Ticker */}
        <div className="news-ticker">
          <div className="ticker-header">
            <span className="ticker-label">Breaking News</span>
            <span className="ticker-time">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="ticker-content">
            🌍 Global Economic Forum Concludes with Historic Trade Agreements • 💼 Technology Stocks Surge to Record Highs • 🚀 NASA Announces Major Space Exploration Mission
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="category-nav">
          {Object.values(CATEGORIES).map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`category-btn ${currentCategory === category ? 'active' : ''}`}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

// Premium News Card Component
const PremiumNewsCard = ({ article, index }) => {
  return (
    <article className="premium-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="card-media">
        <img 
          src={article.urlToImage} 
          alt={article.title}
          className="card-image"
        />
        <div className="card-overlay">
          <div className="card-badges">
            {article.isBreaking && <span className="badge badge-breaking">Breaking</span>}
            {article.isExclusive && <span className="badge badge-exclusive">Exclusive</span>}
            {article.isLive && <span className="badge badge-live">Live</span>}
          </div>
          <div className="card-source">{article.source.name}</div>
          <div className="card-date">
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{article.title}</h3>
        <p className="card-description">{article.description}</p>
        
        <div className="card-footer">
          <span className="read-time">{article.readTime} read</span>
          <button className="watch-now-btn">
            <span>Watch Now</span>
            <span>▶</span>
          </button>
        </div>
      </div>
    </article>
  );
};

// Enhanced News Data with Premium Content
const getPremiumNewsByCategory = (category) => {
  const premiumNews = [
    {
      title: "ICHTAG EXCLUSIVE: Revolutionary AI System Transforms Global Healthcare",
      description: "Groundbreaking artificial intelligence achieves unprecedented accuracy in medical diagnostics, promising to revolutionize patient care worldwide with 99.8% detection rates.",
      urlToImage: "https://picsum.photos/600/400?random=ai-health",
      publishedAt: new Date().toISOString(),
      source: { name: "ICHTAG Health Innovation" },
      category: "technology",
      isBreaking: true,
      isExclusive: true,
      isLive: false,
      readTime: "6 min"
    },
    {
      title: "BREAKING: Historic Climate Accord Signed by 195 Nations",
      description: "World leaders unite in unprecedented global agreement to achieve carbon neutrality by 2040, marking the most ambitious climate action in human history.",
      urlToImage: "https://picsum.photos/600/400?random=climate",
      publishedAt: new Date().toISOString(),
      source: { name: "ICHTAG Global Affairs" },
      category: "general",
      isBreaking: true,
      isExclusive: false,
      isLive: true,
      readTime: "8 min"
    },
    {
      title: "LIVE: International Space Station Makes Astounding Discovery",
      description: "Astronauts aboard the ISS have uncovered evidence of microbial life in Martian soil samples, potentially rewriting our understanding of life in the universe.",
      urlToImage: "https://picsum.photos/600/400?random=space",
      publishedAt: new Date().toISOString(),
      source: { name: "ICHTAG Space Exploration" },
      category: "science",
      isBreaking: false,
      isExclusive: true,
      isLive: true,
      readTime: "5 min"
    },
    {
      title: "Global Markets Soar to Unprecedented Heights",
      description: "International stock exchanges experience historic rally as technological innovation and sustainable energy sectors lead unprecedented economic growth.",
      urlToImage: "https://picsum.photos/600/400?random=markets",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "ICHTAG Financial Markets" },
      category: "business",
      isBreaking: false,
      isExclusive: false,
      isLive: false,
      readTime: "4 min"
    },
    {
      title: "Championship Final Shatters Global Viewership Records",
      description: "Historic sports event draws over 2 billion viewers worldwide as underdog team achieves stunning victory in the most-watched championship in history.",
      urlToImage: "https://picsum.photos/600/400?random=sports",
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      source: { name: "ICHTAG Sports Network" },
      category: "sports",
      isBreaking: false,
      isExclusive: true,
      isLive: false,
      readTime: "3 min"
    },
    {
      title: "Medical Breakthrough Offers Hope for Chronic Diseases",
      description: "Revolutionary new treatment demonstrates 95% success rate in clinical trials, offering new hope for millions suffering from previously incurable conditions.",
      urlToImage: "https://picsum.photos/600/400?random=medical",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: { name: "ICHTAG Medical Research" },
      category: "health",
      isBreaking: false,
      isExclusive: false,
      isLive: false,
      readTime: "7 min"
    },
    {
      title: "Entertainment Industry Embraces Virtual Reality Revolution",
      description: "Major studios announce groundbreaking VR experiences that are transforming how audiences consume entertainment worldwide.",
      urlToImage: "https://picsum.photos/600/400?random=entertainment",
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      source: { name: "ICHTAG Entertainment" },
      category: "entertainment",
      isBreaking: false,
      isExclusive: false,
      isLive: false,
      readTime: "4 min"
    }
  ];

  if (category === 'all') {
    return premiumNews;
  }
  
  return premiumNews.filter(article => article.category === category);
};

// Premium Dashboard Component
const PremiumDashboard = () => {
  const { user } = useAuth();
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.ALL);
  const news = getPremiumNewsByCategory(currentCategory);

  return (
    <div className="premium-dashboard">
      <PremiumHeader 
        currentCategory={currentCategory}
        onCategoryChange={setCurrentCategory}
      />

      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">
            {formatCategoryName(currentCategory)} Coverage
          </h1>
          <p className="page-subtitle">
            {news.length} premium stories curated for you
          </p>
        </div>

        <div className="news-grid">
          {news.map((article, index) => (
            <PremiumNewsCard 
              key={index} 
              article={article} 
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? <PremiumDashboard /> : <AuthPage />}
    </div>
  );
};

// Root component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;