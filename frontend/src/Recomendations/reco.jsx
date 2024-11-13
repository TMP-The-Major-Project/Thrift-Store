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

  // Fetch product recommendations for the specific user
  const fetchRecommendedProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/recommendations?user_id=${userId}`);
      const data = await response.json();

      // Assuming you only receive product IDs and need to fetch details separately
      const recommendedProductIds = data.recommendations;
      const productDetails = await Promise.all(recommendedProductIds.map(async (id) => {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        return await res.json();
      }));

      setProducts(productDetails);
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
  }, [userId, username, location.pathname]);

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
              <p className="recommended-product-price">₹{product.newPrice}</p>
              <button className="add-to-cart-button" onClick={() => handleButtonClick(product.id)}>
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
