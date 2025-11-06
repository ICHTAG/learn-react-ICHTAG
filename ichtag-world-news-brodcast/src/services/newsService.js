// Comprehensive mock data for 10+ major news sources
const mockNewsBySource = {
  bbc: [
    {
      title: "BBC: Climate Summit Reaches Historic Global Agreement",
      description: "World leaders unite on ambitious climate targets for 2030 with binding commitments from 150 nations.",
      url: "https://bbc.com/news/climate-agreement",
      urlToImage: "https://picsum.photos/400/200?random=bbc1",
      publishedAt: new Date().toISOString(),
      source: { name: "BBC News", id: "bbc" },
      content: "The agreement includes unprecedented commitments to reduce carbon emissions and transition to renewable energy sources globally.",
      category: "general"
    },
    {
      title: "BBC: Major AI Breakthrough in Medical Diagnostics",
      description: "New artificial intelligence system can detect diseases with 98% accuracy, revolutionizing healthcare.",
      url: "https://bbc.com/news/ai-medicine",
      urlToImage: "https://picsum.photos/400/200?random=bbc2",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { name: "BBC News", id: "bbc" },
      content: "The AI system has shown remarkable capabilities in early detection of various medical conditions.",
      category: "technology"
    }
  ],
  cnn: [
    {
      title: "CNN: Stock Markets Surge to All-Time High",
      description: "Global markets rally as economic indicators show stronger than expected recovery and growth.",
      url: "https://cnn.com/markets-surge",
      urlToImage: "https://picsum.photos/400/200?random=cnn1",
      publishedAt: new Date().toISOString(),
      source: { name: "CNN", id: "cnn" },
      content: "Technology stocks lead the rally with major tech companies reporting record quarterly earnings.",
      category: "business"
    },
    {
      title: "CNN: Breakthrough in Quantum Computing Announced",
      description: "Scientists achieve quantum supremacy with new processor that solves previously impossible problems.",
      url: "https://cnn.com/quantum-breakthrough",
      urlToImage: "https://picsum.photos/400/200?random=cnn2",
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      source: { name: "CNN", id: "cnn" },
      content: "The new quantum computer can perform calculations that would take traditional supercomputers thousands of years.",
      category: "technology"
    }
  ],
  fox: [
    {
      title: "FOX: Economic Policies Drive Record Job Growth",
      description: "New employment data shows highest job creation numbers in decades across multiple sectors.",
      url: "https://foxnews.com/job-growth",
      urlToImage: "https://picsum.photos/400/200?random=fox1",
      publishedAt: new Date().toISOString(),
      source: { name: "Fox News", id: "fox" },
      content: "Manufacturing and technology sectors lead the employment surge with thousands of new positions created.",
      category: "business"
    }
  ],
  nbc: [
    {
      title: "NBC: Space Mission Discovers Habitable Planets",
      description: "NASA telescope identifies three Earth-like planets in habitable zones of distant star systems.",
      url: "https://nbcnews.com/space-discovery",
      urlToImage: "https://picsum.photos/400/200?random=nbc1",
      publishedAt: new Date().toISOString(),
      source: { name: "NBC News", id: "nbc" },
      content: "The discovery marks a significant milestone in the search for extraterrestrial life and habitable worlds.",
      category: "science"
    }
  ],
  reuters: [
    {
      title: "Reuters: Global Trade Agreement Reached After Marathon Talks",
      description: "Major economies sign comprehensive trade deal expected to boost global commerce by 15%.",
      url: "https://reuters.com/trade-deal",
      urlToImage: "https://picsum.photos/400/200?random=reuters1",
      publishedAt: new Date().toISOString(),
      source: { name: "Reuters", id: "reuters" },
      content: "The agreement removes tariffs on thousands of products and establishes new trade standards.",
      category: "business"
    }
  ],
  'associated-press': [
    {
      title: "AP: Healthcare Reform Bill Passes with Bipartisan Support",
      description: "Landmark legislation aims to reduce prescription drug costs and expand healthcare access.",
      url: "https://apnews.com/healthcare-reform",
      urlToImage: "https://picsum.photos/400/200?random=ap1",
      publishedAt: new Date().toISOString(),
      source: { name: "Associated Press", id: "associated-press" },
      content: "The bill includes provisions to cap insulin prices and expand Medicare coverage for millions.",
      category: "health"
    }
  ],
  'al-jazeera': [
    {
      title: "Al Jazeera: Middle East Peace Talks Show Progress",
      description: "Diplomatic efforts yield positive results as regional leaders commit to new peace framework.",
      url: "https://aljazeera.com/peace-talks",
      urlToImage: "https://picsum.photos/400/200?random=aj1",
      publishedAt: new Date().toISOString(),
      source: { name: "Al Jazeera", id: "al-jazeera" },
      content: "The framework includes economic cooperation and security agreements between neighboring nations.",
      category: "general"
    }
  ],
  cbs: [
    {
      title: "CBS: Entertainment Industry Embraces New Streaming Model",
      description: "Major studios announce revolutionary distribution system for digital content worldwide.",
      url: "https://cbsnews.com/streaming-revolution",
      urlToImage: "https://picsum.photos/400/200?random=cbs1",
      publishedAt: new Date().toISOString(),
      source: { name: "CBS News", id: "cbs" },
      content: "The new model allows creators to reach global audiences directly while maintaining creative control.",
      category: "entertainment"
    }
  ],
  abc: [
    {
      title: "ABC: Education Reform Initiative Launches Nationwide",
      description: "Comprehensive program aims to modernize curriculum and improve student outcomes across the country.",
      url: "https://abcnews.com/education-reform",
      urlToImage: "https://picsum.photos/400/200?random=abc1",
      publishedAt: new Date().toISOString(),
      source: { name: "ABC News", id: "abc" },
      content: "The initiative focuses on STEM education, digital literacy, and career readiness programs.",
      category: "general"
    }
  ],
  'usa-today': [
    {
      title: "USA Today: Sports League Announces Expansion Teams",
      description: "Major professional league to add four new franchises in growing markets across the country.",
      url: "https://usatoday.com/sports-expansion",
      urlToImage: "https://picsum.photos/400/200?random=usa1",
      publishedAt: new Date().toISOString(),
      source: { name: "USA Today", id: "usa-today" },
      content: "The expansion marks the largest growth in the league's history with teams in previously underserved markets.",
      category: "sports"
    }
  ]
};

export const newsService = {
  async getTopHeadlines(sources = ['all'], category = 'all') {
    return new Promise((resolve) => {
      setTimeout(() => {
        let articles = [];
        
        if (sources.includes('all')) {
          // Get all sources
          Object.values(mockNewsBySource).forEach(sourceArticles => {
            articles = [...articles, ...sourceArticles];
          });
        } else {
          // Get specific sources
          sources.forEach(source => {
            if (mockNewsBySource[source]) {
              articles = [...articles, ...mockNewsBySource[source]];
            }
          });
        }
        
        // Filter by category if needed
        if (category !== 'all') {
          articles = articles.filter(article => 
            article.category === category
          );
        }
        
        // Sort by date (newest first)
        articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        
        resolve({
          articles,
          totalResults: articles.length,
          status: 'ok'
        });
      }, 800);
    });
  },

  async getNewsBySource(source) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const articles = mockNewsBySource[source] || [];
        resolve({
          articles,
          totalResults: articles.length,
          status: 'ok'
        });
      }, 600);
    });
  },

  async searchNews(query, sources = ['all']) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allArticles = [];
        
        if (sources.includes('all')) {
          Object.values(mockNewsBySource).forEach(sourceArticles => {
            allArticles = [...allArticles, ...sourceArticles];
          });
        } else {
          sources.forEach(source => {
            if (mockNewsBySource[source]) {
              allArticles = [...allArticles, ...mockNewsBySource[source]];
            }
          });
        }
        
        const filteredNews = allArticles.filter(article =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase()) ||
          article.content.toLowerCase().includes(query.toLowerCase())
        );
        
        resolve({
          articles: filteredNews,
          totalResults: filteredNews.length,
          status: 'ok'
        });
      }, 600);
    });
  }
};