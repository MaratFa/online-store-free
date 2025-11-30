import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Online Store
          </Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/account">Account</Link></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
            <button className="cart-btn">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
