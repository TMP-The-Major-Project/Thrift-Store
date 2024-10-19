import React, { useState, createContext } from "react";

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < 6; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ProdContext = createContext(null)

export const ProdContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
  };
  console.log(cartItems)
  return (
    < ProdContext.Provider value = {{contextValue}}>
      {props.children}
    </ProdContext.Provider>
  )

};

