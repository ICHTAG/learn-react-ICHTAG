import { capitalizeFirst } from './helpers';

export const formatCategoryName = (category) => {
  const categoryMap = {
    all: 'All News',
    general: 'General',
    technology: 'Technology',
    sports: 'Sports',
    business: 'Business',
    health: 'Health',
    entertainment: 'Entertainment',
    science: 'Science'
  };
  
  return categoryMap[category] || capitalizeFirst(category);
};

export const formatReadingTime = (text) => {
  if (!text) return '1 min read';
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};