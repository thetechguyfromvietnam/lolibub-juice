import React, { useMemo } from 'react';
import './OrderConfirmation.css';
import { getSectionTitle } from '../utils/menuSections';

const OrderConfirmation = ({ orderNumber, cart, total, customerInfo, onNewOrder, onPhoneOrder }) => {
  const groupedItems = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [cart]);

  const getItemIcon = (item) => {
    if (!item.image) return '🍽️';
    return typeof item.image === 'string' && item.image.startsWith('/') ? '🍽️' : item.image;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printDate = new Date().toLocaleString('vi-VN');
    const categoryMarkup = Object.entries(groupedItems).map(([category, items]) => `
            <div class="section-title">${getSectionTitle(category)}</div>
            ${items.map(item => `
              <div class="item-row">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">${item.quantity}x</span>
                <span>${item.price * item.quantity}k</span>
              </div>
            `).join('')}
          `).join('');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hoá đơn Combamien - ${orderNumber}</title>
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
            .section-title {
              font-weight: bold;
              margin: 8px 0 4px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🥗 COMBAMIEN 🧡</h1>
            <div class="divider"></div>
            <div style="font-size: 12px;">Đơn hàng #${orderNumber}</div>
            <div style="font-size: 11px;">${printDate}</div>
          </div>
          
          ${customerInfo ? `
            <div class="order-info">
              <strong>Khách hàng:</strong><br/>
              ${customerInfo.customerName}<br/>
              📞 ${customerInfo.customerPhone}<br/>
              📍 ${customerInfo.customerAddress}<br/>
              📅 ${customerInfo.eventDate || 'Chưa cập nhật'}<br/>
              🕒 ${customerInfo.deliveryWindow || 'Theo trao đổi'}<br/>
              👥 ${customerInfo.peopleCount || 'Chưa cập nhật'} phần
              <div class="divider"></div>
            </div>
          ` : ''}
          
          <div class="items">
            ${categoryMarkup}
          </div>
          
          <div class="total">
            TOTAL: ${total}k VND
          </div>
          
          <div class="footer">
            ✅ Đơn hàng đã ghi nhận<br/>
            Combamien sẽ liên hệ xác nhận trong ít phút.<br/>
            Xin cảm ơn!
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
        <div className="success-icon">🥗</div>
        <h1>Đơn hàng đã được tiếp nhận!</h1>
        <div className="order-number">
          <p>Mã đơn</p>
          <h2>{orderNumber}</h2>
        </div>
        
        {customerInfo && (
          <div className="customer-details">
            <h3>Thông tin khách hàng</h3>
            <div className="customer-info-item">
              <strong>Tên:</strong> {customerInfo.customerName}
            </div>
            <div className="customer-info-item">
              <strong>SĐT:</strong> {customerInfo.customerPhone}
            </div>
            <div className="customer-info-item">
              <strong>Địa chỉ:</strong> {customerInfo.customerAddress}
            </div>
            <div className="customer-info-item">
              <strong>Ngày giao:</strong> {customerInfo.eventDate || 'Đang cập nhật'}
            </div>
            {customerInfo.deliveryWindow && (
              <div className="customer-info-item">
                <strong>Khung giờ:</strong> {customerInfo.deliveryWindow}
              </div>
            )}
            {customerInfo.peopleCount && (
              <div className="customer-info-item">
                <strong>Số phần:</strong> {customerInfo.peopleCount}
              </div>
            )}
            {customerInfo.notes && (
              <div className="customer-info-item">
                <strong>Ghi chú:</strong> {customerInfo.notes}
              </div>
            )}
          </div>
        )}
        
        <div className="order-details">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="order-category">
              <h3>{getSectionTitle(category)}</h3>
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <span className="item-emoji">{getItemIcon(item)}</span>
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Số lượng: {item.quantity}</span>
                  </div>
                  <span className="item-price">{(item.price * item.quantity)}k</span>
                </div>
              ))}
            </div>
          ))}
          
          <div className="order-total">
            <p>Tổng tạm tính: {total}k</p>
          </div>
        </div>
        
        <p className="info-note">
          🎉 Combamien sẽ liên hệ để thống nhất thời gian giao và hướng dẫn thanh toán.
        </p>
        
        <div className="action-buttons">
          <button className="btn-print" onClick={handlePrint}>
            🖨️ In hoá đơn tạm
          </button>
          <button className="btn-send" onClick={onPhoneOrder}>
            📱 Gửi đơn qua Zalo/WhatsApp
          </button>
          <button className="btn-new" onClick={onNewOrder}>
            Tạo đơn mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
