import React from "react";
import { Link } from "react-router-dom";
import "./SimpleHeader.css";

const SimpleHeader = () => {
  return (
    <header className="simple-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>Thrift Store</h1>
          </Link>
        </div>
        <div className="simple-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/product" className="nav-link">Products</Link>
          <Link to="/login" className="nav-link">Account</Link>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader; 