import React from 'react';
import './Cart.css';

const Cart = ({ cart, total, onClose, onRemove, onUpdateQuantity, onCheckout }) => {
  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-panel">
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="close-cart" onClick={onClose}>✕</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-image-wrapper">
                    {item.image && typeof item.image === 'string' && item.image.startsWith('/images/') ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="cart-item-image"
                      />
                    ) : (
                      <span className="cart-item-emoji">{item.image}</span>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{(item.price * item.quantity)}k</p>
                  </div>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-amount">{total}k</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Place Order 📞
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

