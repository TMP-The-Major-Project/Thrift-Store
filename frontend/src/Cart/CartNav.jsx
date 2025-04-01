import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import './CartNav.css';

const CartNav = ({ cartCount, wishlistCount }) => {
  const navigate = useNavigate();

  return (
    <nav className="cart-nav">
      <div className="cart-nav-left">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1 className="cart-title">Shopping Cart</h1>
      </div>
      
      <div className="cart-nav-right">
        <div className="cart-nav-icon" onClick={() => navigate('/wishlist')}>
          <FaHeart />
          {wishlistCount > 0 && (
            <span className="notification-badge">{wishlistCount}</span>
          )}
        </div>
        <div className="cart-nav-icon" onClick={() => navigate('/cart')}>
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="notification-badge">{cartCount}</span>
          )}
        </div>
        <div className="cart-nav-icon" onClick={() => navigate('/profile')}>
          <FaUser />
        </div>
      </div>
    </nav>
  );
};

export default CartNav; 