import "../Products/Product.css"
import "./cart.css"

const CartItem = ({ img, title, newPrice }) => {
  return (
      <section className="cart">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-price">
          </section>
        </div>
        <div className="checkout">
          <p> Subtotal: {newPrice}</p>
          <button> Continue Shopping </button>
          <button> Checkout  </button>
        </div>     
    </section>
  );
};

export default CartItem;
