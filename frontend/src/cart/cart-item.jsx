import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export const CartItem = (props) => {
  const { id, title, newPrice, img } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem">
      <img src={img} alt={title} />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p> Price: ${newPrice}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};

