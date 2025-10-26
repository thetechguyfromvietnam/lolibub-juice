import React from 'react';
import './Header.css';
import { settings } from '../config/settings';

const Header = ({ cartCount, onCartClick, onLogoClick }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={onLogoClick}>
          <img src="/images/logo.png" alt="Lolibub Juice Logo" className="logo-image" />
          <div className="logo-text">
            <h1>{settings.storeName}</h1>
            <div className="store-info">
              <span>📍 52 Đường 31C, Bình Trưng, TP. Hồ Chí Minh</span>
              <span>•</span>
              <span>📞 0896894688</span>
            </div>
          </div>
        </div>
        <button className="cart-button" onClick={onCartClick}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;

