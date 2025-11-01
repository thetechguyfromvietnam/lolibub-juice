import React from 'react';
import './Header.css';
import { settings } from '../config/settings';

const Header = ({ cartCount, onCartClick, onLogoClick }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={onLogoClick}>
          <img src="/images/logo.png" alt="Combamien Logo" className="logo-image" />
          <div className="logo-text">
            <h1>{settings.storeName}</h1>
            <p className="store-slogan">{settings.storeSlogan}</p>
            <div className="store-info">
              <span>📍 52 - 31C, Bình Trưng</span>
              <span>•</span>
              <span>📞 {settings.phoneNumber.replace('+84', '0')}</span>
              <span>•</span>
              <span>Cafe · Nước ép · Trà trái cây</span>
            </div>
          </div>
        </div>
        <button className="cart-button" onClick={onCartClick}>
          📋 Xem giỏ món
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;

