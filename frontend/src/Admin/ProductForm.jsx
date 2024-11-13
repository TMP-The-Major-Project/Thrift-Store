import { useState } from "react";

const ProductForm = ({ existingProduct = {}, updateCallback }) => {
    const [id, setId] = useState(existingProduct.id || "");
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
            id,
            title,
            img,
            reviews,
            prevPrice,
            newPrice: parseFloat(newPrice),
            company,
            color,
            category,
        };

        const url = `http://127.0.0.1:3001/products/${updating ? existingProduct.id : ""}`;
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
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="img">Image URL:</label>
                <input type="text" id="img" value={img} onChange={(e) => setImg(e.target.value)} />
            </div>
            <div>
                <label htmlFor="reviews">Reviews:</label>
                <input type="text" id="reviews" value={reviews} onChange={(e) => setReviews(e.target.value)} />
            </div>
            <div>
                <label htmlFor="prevPrice">Previous Price:</label>
                <input type="text" id="prevPrice" value={prevPrice} onChange={(e) => setPrevPrice(e.target.value)} />
            </div>
            <div>
                <label htmlFor="newPrice">New Price:</label>
                <input type="number" id="newPrice" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            </div>
            <div>
                <label htmlFor="company">Company:</label>
                <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
                <label htmlFor="color">Color:</label>
                <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <button type="submit">{updating ? "Update Product" : "Add Product"}</button>
        </form>
    );
};

export default ProductForm;
