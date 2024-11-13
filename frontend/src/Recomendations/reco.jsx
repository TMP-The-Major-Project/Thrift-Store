import React, { useEffect, useState, useContext } from "react";
import { ProdContext } from "../context/ProdContext"; // Import your context
import { BsFillBagFill } from "react-icons/bs";
import "./styles.css";
import { useLocation } from "react-router-dom";

const RecommendedProducts = ({ userId, username }) => {
  const [products, setProducts] = useState([]);
  const [heading, setHeading] = useState("");
  const location = useLocation();
  const { addToCart } = useContext(ProdContext); // Get addToCart function from context
  const handleButtonClick = (id) => {
      addToCart(id); // Add item to cart
  };

  const fetchRecommendedProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3032/recom/items`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    }
  };

  useEffect(() => {
    const headProducts = "Recommended for " + username;
    const headCart = "Top Picks Before You Checkout!";
    const isCartPage = location.pathname === "/cart";
    if (username) {
      fetchRecommendedProducts();
    }

    setHeading(isCartPage ? headCart : headProducts);
  }, []);

  if (!username) {
    return null;
  }

  return (
    <div className="recommended-products">
      <h2>{heading}</h2>
      <div className="recommended-products-list">
        {products.map((product) => (
          <div className="recommended-product-item" key={product.id}>
            <img
              src={product.img}
              alt={product.title}
              className="recommended-product-image"
            />
            <div className="product-hover-info">
              <h3 className="recommended-product-title">{product.title}</h3>
              <p className="recommended-product-price">₹{product.total_price}</p>
              <button className="add-to-cart-button" onClick={handleButtonClick(product.id)}>
                <BsFillBagFill />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
