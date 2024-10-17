import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/shop-context";
import { fetchData } from "../db/data"; // Import fetch function
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchData(); // Fetching data from the external source
      setProducts(fetchedProducts); // Set the fetched data into state
    };

    loadProducts();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/product")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h1>Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};

export default Cart;
