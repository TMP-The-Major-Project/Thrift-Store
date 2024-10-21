import React, { useContext, useEffect } from "react";
import { ProdContext } from "../context/product-context"; // Import your context
import "./cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, fetchCart, fetchCartTotal } = useContext(ProdContext);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    fetchCart(); // Fetch cart items on component mount
    async function getTotal() {
      const cartTotal = await fetchCartTotal(); // Fetch cart total
      setTotal(cartTotal);
    }
    getTotal();
  }, [fetchCart, fetchCartTotal]);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cartItem" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="description">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="countHandler">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="checkout">
            <h3>Total: ${total}</h3>
            <button onClick={() => alert("Proceeding to checkout")}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
