import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./Valdiate/SignUp.tsx";
import Login from "./Valdiate/Login.tsx";
import AdminLogin from "./Valdiate/AdminLogin.tsx";
import Navigation from "./Navigation/Nav.tsx";
import Products from "./Products/Products";
import { fetchData } from "./db/data"; // Import fetch function
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import Cart from "./cart/Cart";
import Home from "./Home/Home.jsx";
import "./index.css";
import { ProdProvider } from "./context/ProdContext";
import RecommendedProducts from "./Recomendations/reco.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchData();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const handleInputChange = (event) => setQuery(event.target.value);
  const filteredItems = products.filter(
    (product) =>
      product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1,
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
          title === selected,
      );
    }

    return filteredProducts.map(
      ({ id, img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          id={id}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      ),
    );
  }

  const result = filteredData(products, selectedCategory, query);

  useEffect(() => {
    (async () => {
      const resp = await fetch("http://localhost:3001/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await resp.json();
      if (content.message === "Unauthenticated") {
        setUsername("");
      } else {
        setUsername(content.username);
        setUserID(content.id);
      }
    })();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/product"
          element={
            <ProdProvider>
              <>
                <Sidebar handleChange={handleChange} />
                <Navigation
                  query={query}
                  handleInputChange={handleInputChange}
                  username={username}
                  setUsername={setUsername}
                />
                <RecommendedProducts userId={userID} username={username} />
                <Recommended handleClick={handleClick} />
                <Products result={result} />
              </>
            </ProdProvider>
          }
        />

        {/* Wrap the Cart route with ProdProvider */}
        <Route
          path="/cart"
          element={
            <ProdProvider>
              <>
                <Navigation username={username} />
                <Cart result={products} />
                <RecommendedProducts userId={userID} username={username} />
              </>
            </ProdProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
