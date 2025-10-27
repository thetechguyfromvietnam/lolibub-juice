import React from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = ({ orderNumber, cart, total, customerInfo, onNewOrder, onPhoneOrder }) => {

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printDate = new Date().toLocaleString('vi-VN');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${orderNumber}</title>
          <style>
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
            }
            body {
              font-family: 'Courier New', monospace;
              width: 70mm;
              padding: 10mm;
              margin: 0;
              font-size: 14px;
            }
            .header {
              text-align: center;
              border-bottom: 2px dashed #000;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .header h1 {
              font-size: 18px;
              margin: 5px 0;
            }
            .order-info {
              margin: 10px 0;
            }
            .order-info strong {
              font-size: 12px;
            }
            .items {
              margin: 10px 0;
              border-top: 2px dashed #000;
              padding-top: 10px;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
              font-size: 13px;
            }
            .item-name {
              flex: 1;
            }
            .item-qty {
              margin: 0 5px;
            }
            .total {
              border-top: 2px dashed #000;
              padding-top: 10px;
              margin-top: 10px;
              text-align: center;
              font-weight: bold;
              font-size: 16px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              border-top: 2px dashed #000;
              padding-top: 10px;
              font-size: 12px;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🍹 LOLIBUB JUICE 🍹</h1>
            <div class="divider"></div>
            <div style="font-size: 12px;">Receipt #${orderNumber}</div>
            <div style="font-size: 11px;">${printDate}</div>
          </div>
          
          ${customerInfo ? `
            <div class="order-info">
              <strong>Khách hàng:</strong><br/>
              ${customerInfo.customerName}<br/>
              📞 ${customerInfo.customerPhone}<br/>
              📍 ${customerInfo.customerAddress}
              <div class="divider"></div>
            </div>
          ` : ''}
          
          <div class="items">
            <strong>Order Details:</strong>
            ${cart.map(item => `
              <div class="item-row">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">${item.quantity}x</span>
                <span>${item.price * item.quantity}k</span>
              </div>
            `).join('')}
          </div>
          
          <div class="total">
            TOTAL: ${total}k VND
          </div>
          
          <div class="footer">
            ✅ Payment Verified<br/>
            Cảm ơn quý khách!<br/>
            Thank you!
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 250);
  };

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
          <button className="btn-print" onClick={handlePrint}>
            🖨️ Print Receipt
          </button>
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
