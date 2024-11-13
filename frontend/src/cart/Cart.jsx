import React, { useContext, useEffect, useState } from "react";
import { ProdContext } from "../context/ProdContext"; // Import your context
import { useLocation } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    fetchCart,
    fetchCartTotal,
    clearCart,
  } = useContext(ProdContext);
  const [total, setTotal] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const getTotal = async () => {
      await fetchCart(); // Fetch cart items
      const cartTotal = await fetchCartTotal(); // Fetch cart total
      setTotal(cartTotal);
    };
    getTotal();
  }, [location.pathname]);

  // Handle checkout button click
  const handleCheckout = () => {
    window.location.href = "https://rzp.io/rzp/vaefyg6N"; // Redirect to Razorpay URL
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                className="cart-item-image"
                src={item.img}
                alt={item.title}
              />
              <div className="cart-item-description">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">₹{item.total_price}</p>
                <div className="cart-item-actions">
                  <button
                    className="remove-from-cart-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="checkout-section">
            <p>
              <h3 className="total-price">Total: ₹{total}</h3>
              <button
                className="checkout-button"
                onClick={handleCheckout} // Call handleCheckout to redirect
              >
                Checkout
              </button>
              <button className="checkout-button" onClick={() => clearCart()}>
                Clear Cart
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
