import { useContext } from "react";
import { ProdContext } from "../context/product-context";
import { BsFillBagFill } from "react-icons/bs";
import "./Card.css";


const Card = ({ id, img, title, star, reviews, prevPrice, newPrice }) => {
  const {addToCart} = useContext(ProdContext)
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <button className="c_bag" onClick={() => addToCart(id)}>
              <BsFillBagFill className="bag-icon" />
            </button>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
