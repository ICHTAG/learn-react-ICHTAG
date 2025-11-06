import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🌍 World News</h3>
          <p>Your trusted source for global news coverage</p>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>General</li>
            <li>Technology</li>
            <li>Sports</li>
            <li>Business</li>
            <li>Health</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Countries</h4>
          <ul>
            <li>United States</li>
            <li>United Kingdom</li>
            <li>Canada</li>
            <li>Australia</li>
            <li>India</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>About</h4>
          <p>Built with React & modern web technologies</p>
          <p>© 2024 World News App</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;