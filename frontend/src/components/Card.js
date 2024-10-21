import { useContext } from "react";
import { ProdContext } from "../context/product-context"; // Import your context
import { BsFillBagFill } from "react-icons/bs";
import "./Card.css";

const Card = ({ id, img, title, star, reviews, prevPrice, newPrice }) => {
  const { addToCart } = useContext(ProdContext); // Get addToCart function from context

  return (
    <div className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <div className="card-reviews">
          {[...Array(star)].map((_, index) => (
            <span key={index} className="star">
              ⭐
            </span>
          ))}
          <span className="total-reviews">{reviews} reviews</span>
        </div>
        <div className="card-price">
          <span className="price">
            <del>{prevPrice}</del> {newPrice}
          </span>
          <button className="c_bag" onClick={() => addToCart(id)}>
            <BsFillBagFill className="bag-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
