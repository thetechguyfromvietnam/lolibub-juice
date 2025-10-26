import React, { useState } from 'react';
import './PaymentVerification.css';

const PaymentVerification = ({ orderNumber, cart, total, onPaymentVerified, onCancel }) => {
  const [paymentProof, setPaymentProof] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentProof(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!customerName || !customerPhone || !customerAddress || !paymentProof) {
      alert('Please fill in all required fields (name, phone, delivery address) and upload payment proof');
      return;
    }
    onPaymentVerified({
      orderNumber,
      customerName,
      customerPhone,
      customerAddress,
      paymentProof,
      cart,
      total
    });
  };

  return (
    <div className="payment-verification">
      <div className="payment-content">
        <div className="payment-header">
          <div className="success-icon">💳</div>
          <h1>Payment Required</h1>
          <div className="order-number">
            <p>Order Number</p>
            <h2>{orderNumber}</h2>
          </div>
        </div>
        
        <div className="payment-instructions">
          <h3>📱 Payment Instructions:</h3>
          <div className="qr-section">
            <p className="instruction-text">
              Please transfer <strong>{total}k</strong> to the following account:
            </p>
            <div className="qr-placeholder">
              <div className="qr-code-container">
                <p className="qr-label">Scan to Transfer</p>
                <div className="qr-code-box">
                  {(() => {
                    // Try to load QR code image
                    const qrImages = ['/images/qr-code.png', '/images/qr-code.jpg', '/images/qr.png', '/images/qr.jpg'];
                    const existingQr = qrImages.find(src => {
                      // Check if any QR code exists by trying to load it
                      return true; // Will show placeholder if not found
                    });
                    
                    // Check if QR code exists
                    const img = new Image();
                    let qrCodeSrc = null;
                    qrImages.forEach(src => {
                      img.src = src;
                      qrCodeSrc = src;
                    });
                    
                    return (
                      <>
                        <img 
                          src="/images/qr-code.jpg" 
                          alt="QR Code"
                          className="qr-code-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="qr-fallback" style={{display: 'none'}}>
                          <p className="qr-placeholder-text">📱 Loading QR code...</p>
                          <p className="qr-note">Please add your QR code</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="bank-info">
                  <p><strong>Bank:</strong> BIDV</p>
                  <p><strong>Account:</strong> 0896894688</p>
                  <p><strong>Name:</strong> VO THI THU HUYEN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="customer-form">
          <h3>Your Information:</h3>
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input 
              type="tel" 
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="0896894688"
              required
            />
          </div>
          <div className="form-group">
            <label>Delivery Address *</label>
            <input 
              type="text" 
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Enter your delivery address"
              required
            />
          </div>
        </div>

        <div className="payment-proof-section">
          <h3>Upload Payment Proof *</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="payment-proof-input"
            id="payment-proof"
          />
          {paymentProof && (
            <div className="payment-proof-preview">
              <img src={paymentProof} alt="Payment proof" />
              <button onClick={() => setPaymentProof(null)}>Remove</button>
            </div>
          )}
          {!paymentProof && !isUploading && (
            <label htmlFor="payment-proof" className="upload-proof-button">
              📸 Upload Transfer Screenshot
            </label>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn-submit" onClick={handleSubmit}>
            ✅ Confirm & Send Order
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancel Order
          </button>
        </div>
        
        <p className="info-note">
          ⚠️ Your order will be processed after payment verification
        </p>
      </div>
    </div>
  );
};

export default PaymentVerification;

