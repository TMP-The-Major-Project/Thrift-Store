import React from "react";
import CartItem from "./CartItem";

const Cart = ({ result }) => {
  return (
    result.map(
      ({ id, img, title, star, reviews, prevPrice, newPrice }) => (
        <CartItem
          id={id}
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    )
  );
};

export default Cart
