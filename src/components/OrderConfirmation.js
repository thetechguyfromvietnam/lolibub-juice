import React from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = ({ orderNumber, cart, total, customerInfo, onNewOrder, onPhoneOrder }) => {
  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <div className="success-icon">✅</div>
        <h1>Payment Verified!</h1>
        <div className="order-number">
          <p>Order Number</p>
          <h2>{orderNumber}</h2>
        </div>
        
        {customerInfo && (
          <div className="customer-details">
            <h3>Customer Information</h3>
            <div className="customer-info-item">
              <strong>Name:</strong> {customerInfo.customerName}
            </div>
            <div className="customer-info-item">
              <strong>Phone:</strong> {customerInfo.customerPhone}
            </div>
            <div className="customer-info-item">
              <strong>Delivery Address:</strong> {customerInfo.customerAddress}
            </div>
          </div>
        )}
        
        <div className="order-details">
          <h3>Your Order:</h3>
          {cart.map(item => (
            <div key={item.id} className="order-item">
              <span className="item-emoji">{item.image}</span>
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
              <span className="item-price">{(item.price * item.quantity)}k</span>
            </div>
          ))}
          
          <div className="order-total">
            <p>Total: {total}k</p>
          </div>
        </div>
        
        <p className="info-note">
          ✅ Payment received. Your order will be prepared and delivered soon!
        </p>
        
        <div className="action-buttons">
          <button className="btn-send" onClick={onPhoneOrder}>
            📱 Send Order via Phone
          </button>
          <button className="btn-new" onClick={onNewOrder}>
            Place New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
