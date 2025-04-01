import { useState } from "react";
import "./ProductForm.css";

const ProductForm = ({ existingProduct = {}, updateCallback }) => {
  const [title, setTitle] = useState(existingProduct.title || "");
  const [img, setImg] = useState(existingProduct.img || "");
  const [reviews, setReviews] = useState(existingProduct.reviews || "");
  const [prevPrice, setPrevPrice] = useState(existingProduct.prevPrice || "");
  const [newPrice, setNewPrice] = useState(existingProduct.newPrice || "");
  const [company, setCompany] = useState(existingProduct.company || "");
  const [color, setColor] = useState(existingProduct.color || "");
  const [category, setCategory] = useState(existingProduct.category || "");

  const updating = Object.keys(existingProduct).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      img,
      reviews,
      prevPrice,
      newPrice: parseFloat(newPrice),
      company,
      color,
      category,
    };

    const url = `http://127.0.0.1:3001/products/${updating ? existingProduct.id : "add"}`;
    const options = {
      method: updating ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      updateCallback();
    } else {
      const result = await response.json();
      alert(result.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="product-form">
      <h2 className="form-title">{updating ? "Update Product" : "Add New Product"}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="img">Image URL</label>
        <input
          type="text"
          id="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="Enter image URL"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="reviews">Reviews</label>
        <input
          type="text"
          id="reviews"
          value={reviews}
          onChange={(e) => setReviews(e.target.value)}
          placeholder="Enter product reviews"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="prevPrice">Previous Price</label>
        <input
          type="text"
          id="prevPrice"
          value={prevPrice}
          onChange={(e) => setPrevPrice(e.target.value)}
          placeholder="Enter previous price"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="newPrice">New Price</label>
        <input
          type="number"
          id="newPrice"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="Enter new price"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Enter product color"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter product category"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        {updating ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
