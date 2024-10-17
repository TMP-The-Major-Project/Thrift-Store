import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import SignUp from "./Valdiate/SignUp.tsx";
import Login from "./Valdiate/Login.tsx";
import AdminLogin from "./Valdiate/AdminLogin.tsx";
import Navigation from "./Navigation/Nav.tsx";
import Products from "./Products/Products";
import { fetchData } from "./db/data"; // Import fetch function
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import Cart from "./cart/cart";
import "./index.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State to hold the fetched products
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchData(); // Fetching data from the external source
      setProducts(fetchedProducts); // Set the fetched data into state
    };

    loadProducts();
  }, []); // Empty dependency array ensures this runs once on mount

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  const [username, setUsername] = useState('');

  useEffect(() => {
    (
      async () => {
        const resp = await fetch('http://localhost:3001/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });

        const content = await resp.json();
        if(content.message === "Unauthenticated"){
          setUsername("");
        } else {
          setUsername(content.username);
        }
      }
    )();
  }, []); // Adding an empty dependency array to prevent endless re-renders

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/product"
          element={
            <>
              <Sidebar handleChange={handleChange} />
              <Navigation query={query} handleInputChange={handleInputChange} username={username} setUsername={setUsername} />
              <Recommended handleClick={handleClick} />
              <Products result={result} />
            </>
          }
        />
        <Route
          path="/sign-up" 
          element={<SignUp />}
        />
        <Route
          path="/login" 
          element={<Login />}
        />
        <Route
          path="/admin"
          element={<AdminLogin />}
        />
        <Route
          path="/cart" 
          element={<Cart/>}
        />
      </Routes>
    </Router>
  );
}

export default App;

