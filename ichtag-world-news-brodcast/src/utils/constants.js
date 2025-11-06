// src/utils/constants.js
export const CATEGORIES = {
  ALL: 'all',
  GENERAL: 'general',
  TECHNOLOGY: 'technology',
  SPORTS: 'sports',
  BUSINESS: 'business',
  HEALTH: 'health',
  ENTERTAINMENT: 'entertainment',
  SCIENCE: 'science'
};

export const NEWS_SOURCES = {
  ALL: 'all',
  BBC: 'bbc',
  CNN: 'cnn',
  FOX: 'fox',
  NBC: 'nbc'
};

export const COUNTRIES = {
  US: 'us',
  GB: 'gb',
  CA: 'ca',
  AU: 'au'
};

export const AUTH_KEYS = {
  USERS: 'newsapp_users',
  CURRENT_USER: 'current_news_user',
  IS_LOGGED_IN: 'is_news_logged_in'
};

export const DEFAULT_USER_PREFERENCES = {
  categories: ['general', 'technology'],
  country: 'us'
};

// Add ICHTAG branding constants
export const APP_CONFIG = {
  TITLE: 'ICHTAG WORLD NEWS',
  TAGLINE: 'Global News Broadcasting Network',
  LOGO: '🌐'
};