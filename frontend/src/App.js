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
import Cart from "./cart/cart.jsx";
import "./index.css";
import { ProdProvider } from "./context/product-context";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchData(); 
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const handleInputChange = (event) => setQuery(event.target.value);
  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => setSelectedCategory(event.target.value);
  const handleClick = (event) => setSelectedCategory(event.target.value);

  function filteredData(products, selected, query) {
    let filteredProducts = products;
    if (query) filteredProducts = filteredItems;
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
      ({ id, img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
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
    );
  }

  const result = filteredData(products, selectedCategory, query);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
      <div>
        <ProdProvider>
          <Routes>
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
              path="/cart" 
              element={
                <>
                  <Navigation /> {/* Simplified without search and username props */}
                  <Cart result={products} /> {/* Display cart items */}
                </>
              }
            />
          </Routes>
        </ProdProvider>
      </div>
    </Router>
  );
}

export default App;
