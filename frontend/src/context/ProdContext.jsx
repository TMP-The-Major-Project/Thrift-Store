import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const ProdContext = createContext();

export const ProdProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to fetch the cart items when the provider mounts
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cart/items");
      setCart(response.data.cart); // Make sure your API returns an object with cart
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart items on component mount
  }, []);

  // Add item to cart
  const addToCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:3001/cart/add", {
        product_id: productId,
        quantity: 1, // Default quantity to 1
      });
      // Assuming the server responds with the entire cart
      setCart(response.data.cart); // Ensure your API returns the updated cart
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      console.log(`Attempting to remove product with ID: ${productId}`);
      const response = await axios.delete(`http://localhost:3001/cart/delete/${productId}`);
      console.log('Response from server:', response.data);
      setCart(response.data.cart); // Ensure your API returns the updated cart
      window.location.reload(); // Reload the page
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
      setCart(response.data.cart); // Ensure your API returns the updated cart
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  // Fetch cart total
  const fetchCartTotal = async () => {
    try {
      const response = await axios.get("http://localhost:3001/cart/total");
      return response.data.cart_total; // Ensure your API returns the cart_total correctly
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
    <ProdContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, updateQuantity, fetchCartTotal, clearCart }}>
      {children}
    </ProdContext.Provider>
  );
};
