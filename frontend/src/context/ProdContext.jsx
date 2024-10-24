import React, { createContext, useState } from "react";
import axios from "axios";

// Create the context
export const ProdContext = createContext();

export const ProdProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:3001/cart/add", {
        product_id: productId,
        quantity: 1, // Default quantity to 1
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      console.log(`Attempting to remove product with ID: ${productId}`);
      const response = await axios.delete(`http://localhost:3001/cart/remove/${productId}`);
      console.log('Response from server:', response.data);
      setCart(response.data.cart); // Update cart after removal
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  // Update item quantity in cart
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:3001/cart/update/${productId}`, {
        quantity: newQuantity,
      });
      setCart(response.data.cart); // Update cart with new quantity
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  // Fetch all cart items
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cart/items");
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Fetch cart total
  const fetchCartTotal = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cart/total");
      return response.data.cart_total;
    } catch (error) {
      console.error("Error fetching cart total:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await axios.delete("http://localhost:3001/cart/clear");
      setCart([]); // Empty the cart
      console.log('Cart cleared:', response.data);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <ProdContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, fetchCart, fetchCartTotal, clearCart }}>
      {children}
    </ProdContext.Provider>
  );
};
