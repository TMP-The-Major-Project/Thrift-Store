import { useState, useEffect } from "react";
import "./AdminDash.css"
import ProductForm from "./ProductForm";
const AdminDash = ({ user }) => {

  const [product, setProduct] = useState([{}])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({})


  useEffect(() => {
    fetchProduct()
  }, []);

  const fetchProduct = async () => {
    const response = await fetch("http://127.0.0.1:3001/products")
    const data = await response.json()
    setProduct(data)
    console.log(data)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentProduct({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (product) => {
    if (isModalOpen) return
    setCurrentProduct(product)
    setIsModalOpen(true)
  }
  const onUpdate = () => {
    closeModal()
    fetchProduct()
  }

  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE"
      }
      const response = await fetch(`http://127.0.0.1:3001/products/${id}`, options)
      if (response.status == 200) {
        onUpdate()
      } else {
        console.error("Failed to delete")
      }
    } catch (error) {
      alert(error)
    }
  }

  if (user !== "test") {
    return <div className="admin-container">
      <h2 className="admin-title">Unauthorized</h2>
    </div>;
  }

  return (
    <>
      <div className="admin-container">
        <h2 className="admin-title">Product List</h2>
        <button onClick={openCreateModal}>Add New Product</button>
        {isModalOpen && <div className="modal">
          <div className="modal_content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ProductForm existingProduct={currentProduct} updateCallback={onUpdate} />
          </div>
        </div>
        }
        {product.map((item) => (
          <div className="admin-item" key={item.id}>
            <img className="admin-item-image" src={item.img} alt={item.title} />
            <div className="admin-item-description">
              <p className="admin-item-title">ID: {item.id}</p>
              <p className="admin-item-title">Product Name: {item.title}</p>
              <p className="admin-item-price">Orignal Price: {item.prevPrice}</p>
              <p className="admin-item-price">Discount Price: ₹{item.newPrice}</p>
              <div className="admin-item-actions">
                <button className="remove-from-admin-button" onClick={() => openEditModal(item)}>Edit</button>
                <button className="remove-from-admin-button" onClick={() => onDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminDash;
