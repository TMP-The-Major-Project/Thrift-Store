import React from "react";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUser , AiOutlineLogout } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = ({ handleInputChange, query, username, setUsername }) => {
  const location = useLocation(); // Get the current location

  const logout = async () => {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    setUsername('');
  };

  let menu;

  // Check if the current page is /cart
  const isCartPage = location.pathname === '/cart';

  if (username !== "") {
    menu = (
      <nav>
        {isCartPage && ( // Show the product link only on the /cart page
          <Link to="/product" className="nav-link">
            Products
          </Link>
        )}
        <div className="nav-container">
          {!isCartPage && ( // Only show the search bar if not on the cart page
            <input
              className="search-input"
              type="text"
              onChange={handleInputChange}
              value={query}
              placeholder={"Search"}
            />
          )}
        </div>
        <div className="profile-container">
          <a href="#">
            <FiHeart className="nav-icons" />
          </a>
          <Link to="/cart">
            <AiOutlineShoppingCart className="nav-icons" />
          </Link>
          <Link to="/login" onClick={logout}>
            <AiOutlineLogout className="nav-icons" />
          </Link>
        </div>
      </nav>
    );
  } else {
    menu = (
      <nav>
        {isCartPage && ( // Show the product link only on the /cart page
          <Link to="/product" className="nav-link">
            Products
          </Link>
        )}
        <div className="nav-container">
          {!isCartPage && ( // Only show the search bar if not on the cart page
            <input
              className="search-input"
              type="text"
              onChange={handleInputChange}
              value={query}
              placeholder="Search"
            />
          )}
        </div>
        <div className="profile-container">
          <a href="#">
            <FiHeart className="nav-icons" />
          </a>
          <Link to="/cart">
            <AiOutlineShoppingCart className="nav-icons" />
          </Link>
          <Link to="/sign-up">
            <AiOutlineUser  className="nav-icons" />
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <main>
      {menu}
    </main>
  );
};

export default Nav;
