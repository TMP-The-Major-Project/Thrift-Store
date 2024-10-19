import React from "react";
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = ({ handleInputChange, query, username, setUsername }) => {
  const logout = async () => {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });

    setUsername('')
  }
  let menu
  if(username !== ""){
    menu = (
      <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder={"Hello " + username + "!"}
        />
      </div>
      <div className="profile-container">
         <a href="#">
           <FiHeart className="nav-icons" />
         </a>
         <a href="/cart">
           <AiOutlineShoppingCart className="nav-icons" />
         </a>
         <a>
          <Link to="/login" onClick={logout}>
           <AiOutlineLogout className="nav-icons" />
          </Link>
         </a>
       </div>
      </nav>
    )
  } else {
        menu = (
      <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Search"
        />
      </div>
      <div className="profile-container">
         <a href="#">
           <FiHeart className="nav-icons" />
         </a>
         <a href="cart">
           <AiOutlineShoppingCart className="nav-icons" />
         </a>
         <a href="/sign-up">
           <AiOutlineUser className="nav-icons" />
         </a>
       </div>
      </nav>
    )

  }

  return (
    <main>
    {menu}
    </main>
  );
};

export default Nav;
