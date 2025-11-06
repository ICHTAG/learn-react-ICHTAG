// src/services/authService.js
import { AUTH_KEYS, DEFAULT_USER_PREFERENCES } from '../utils/constants';

export const authService = {
  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem(AUTH_KEYS.USERS) || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          // Remove password before storing current user
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
          localStorage.setItem(AUTH_KEYS.IS_LOGGED_IN, 'true');
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  async signup(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password, name } = userData;
        
        if (!email || !password || !name) {
          reject(new Error('Please fill all fields'));
          return;
        }

        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem(AUTH_KEYS.USERS) || '[]');
        if (users.find(u => u.email === email)) {
          reject(new Error('User already exists with this email'));
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          email,
          password,
          name,
          preferences: { ...DEFAULT_USER_PREFERENCES },
          createdAt: new Date().toISOString()
        };

        // Save to users list
        users.push(newUser);
        localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));

        // Set as current user (without password)
        const { password: _, ...userWithoutPassword } = newUser;
        localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
        localStorage.setItem(AUTH_KEYS.IS_LOGGED_IN, 'true');

        resolve(userWithoutPassword);
      }, 1000);
    });
  },

  logout() {
    localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
    localStorage.removeItem(AUTH_KEYS.IS_LOGGED_IN);
  },

  getCurrentUser() {
    const userStr = localStorage.getItem(AUTH_KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return localStorage.getItem(AUTH_KEYS.IS_LOGGED_IN) === 'true';
  }
};