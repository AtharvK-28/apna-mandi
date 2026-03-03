import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import './FloatingCartButton.css';

const FloatingCartButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { cartCount, getCartTotal } = useCart();

  // Don't render if no items in cart
  if (cartCount === 0) return null;

  const totalPrice = getCartTotal();

  return (
    <div
      className="floating-cart-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Tooltip */}
      {isHovered && (
        <div className="cart-preview">
          <div className="preview-header">
            <p className="preview-title">Cart Summary</p>
            <p className="preview-count">
              {cartCount} item{cartCount !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="preview-footer">
            <div className="preview-total">
              <span className="total-label">Total</span>
              <span className="total-price">₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="preview-checkout"
              onClick={() => {
                window.location.href = '/shopping-cart-checkout';
              }}
            >
              View cart &amp; checkout
            </button>
          </div>
        </div>
      )}

      {/* Main Cart Button */}
      <button
        type="button"
        className="cart-button-main"
        aria-label={`Cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
        onClick={() => {
          window.location.href = '/shopping-cart-checkout';
        }}
      >
        <span aria-hidden="true">🛒</span>
        {cartCount > 0 && (
          <span className="cart-badge">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingCartButton;