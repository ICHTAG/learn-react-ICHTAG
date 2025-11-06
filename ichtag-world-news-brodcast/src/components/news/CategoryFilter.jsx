import React from 'react';
import { CATEGORIES } from '../../utils/constants';
import { formatCategoryName } from '../../utils/formatters';
const CategoryFilter = ({ currentCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-buttons">
        {Object.values(CATEGORIES).map(category => (
          <button
            key={category}
            className={`category-filter-btn ${currentCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;