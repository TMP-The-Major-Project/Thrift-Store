import { useContext, useState } from "react";
import { ProdContext } from "../context/ProdContext"; // Import your context
import { BsFillBagFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Card.css";

const Card = ({ id, img, title, star, reviews, prevPrice, newPrice }) => {
  const { addToCart } = useContext(ProdContext); // Get addToCart function from context
  const [isAdded, setIsAdded] = useState(false); // State to track if item is added
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleButtonClick = () => {
    if (!isAdded) {
      console.log(id)
      addToCart(id); // Add item to cart
      setIsAdded(true); // Update state to indicate item is added
    } else {
      navigate("/cart"); // Navigate to cart page
    }
  };

  return (
    <div className="card">
      <img src={img} alt={title} className="card-img uniform-size" /> {/* Added class 'uniform-size' */}
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
          <button className="c_bag" onClick={handleButtonClick}>
            {isAdded ? "Go to Cart" : <><BsFillBagFill className="bag-icon" /></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
