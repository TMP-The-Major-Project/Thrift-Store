import { createContext, useEffect, useState } from "react";
import { fetchData } from "../db/data";

export const ShopContext = createContext(null);

// Define getDefaultCart function outside of the component
const getDefaultCart = (products) => {
  let cart = {};
  for (let i = 1; i < products.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch products from the API
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchData(); // Fetching data from the external source
      setProducts(fetchedProducts); // Set the fetched data into state
      setCartItems(getDefaultCart(fetchedProducts)); // Initialize cart with the fetched products
    };

    loadProducts();
  }, []); // Empty dependency array ensures this runs once on mount

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = products.find((product) => product.id === Number(item));
  //       totalAmount += cartItems[item] * itemInfo.newPrice;
  //     }
  //   }
  //   return totalAmount;
  // };

  // const addToCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  // };
  //
  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };
  //
  // const updateCartItemCount = (newAmount, itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  // };
  //
  // const checkout = () => {
  //   setCartItems(getDefaultCart(products));
  // };

  // const contextValue = {
    // cartItems,
    // addToCart,
    // updateCartItemCount,
    // removeFromCart,
    // getTotalCartAmount,
    // checkout,
  // };

  // return (
  //   <ShopContext.Provider>
  //     // {props.children}
  //   </ShopContext.Provider>
  // );
};
