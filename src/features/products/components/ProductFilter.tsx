
import React, { useState } from 'react';
import { Button } from '../../../components/shared';
import { ProductFilter as ProductFilterType } from '../../../types/product';
import './ProductFilter.css';

interface ProductFilterProps {
  filter: ProductFilterType;
  onChange: (filter: ProductFilterType) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({ filter, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (key: keyof ProductFilterType, value: any) => {
    onChange({
      ...filter,
      [key]: value
    });
  };

  const handleReset = () => {
    onChange({
      category: '',
      minPrice: 0,
      maxPrice: 0,
      rating: 0,
      inStock: false,
      featured: false
    });
  };

  return (
    <div className="product-filter">
      <Button 
        variant="outline" 
        onClick={handleToggle}
        className="filter-toggle"
      >
        {isExpanded ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {isExpanded && (
        <div className="filter-content">
          <div className="filter-section">
            <h3 className="filter-title">Category</h3>
            <select 
              value={filter.category} 
              onChange={e => handleChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home & Garden</option>
              <option value="Sports">Sports & Outdoors</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys & Games</option>
            </select>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="price-range">
              <input
                type="number"
                placeholder="Min"
                value={filter.minPrice || ''}
                onChange={e => handleChange('minPrice', e.target.value)}
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filter.maxPrice || ''}
                onChange={e => handleChange('maxPrice', e.target.value)}
                className="price-input"
              />
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Customer Rating</h3>
            <select 
              value={filter.rating} 
              onChange={e => handleChange('rating', e.target.value)}
              className="filter-select"
            >
              <option value="0">Any Rating</option>
              <option value="4">4★ & Up</option>
              <option value="3">3★ & Up</option>
              <option value="2">2★ & Up</option>
              <option value="1">1★ & Up</option>
            </select>
          </div>

          <div className="filter-section">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filter.inStock}
                onChange={e => handleChange('inStock', e.target.checked)}
              />
              <span>In Stock Only</span>
            </label>

            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filter.featured}
                onChange={e => handleChange('featured', e.target.checked)}
              />
              <span>Featured Products</span>
            </label>
          </div>

          <Button variant="outline" onClick={handleReset} className="reset-filter">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
