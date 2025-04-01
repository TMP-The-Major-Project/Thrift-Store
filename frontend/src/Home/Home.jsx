import React from "react";
import "./Home.css"; // Assuming the CSS file is named store.css and is located in the same folder
import { useState } from "react";
import SimpleHeader from "./SimpleHeader";
import Footer from "./Footer";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menutoggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <SimpleHeader />
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Thrift Smart, <br />
              Shop Sustainably!
            </h1>
            {/* <p>Success isn't always about greatness. It's about consistency. Consistent<br />hard work gains success. Greatness will come.</p> */}
            <a href="/product" className="btn">
              View Products &#8594;
            </a>
          </div>
          <div className="hero-image">
            <img
              src="https://i.ibb.co/WWWrNTm/APPENDIABITI-BLACK-HANGER-removebg-preview.png"
              alt="Hero Image"
            />
          </div>
        </div>
      </section>

      <div className="content-section">
        {/* Featured Categories */}
        <div className="categories">
          <div className="small-container">
            <div className="row">
              <div className="col-3">
                <img
                  src="https://m.media-amazon.com/images/I/71qoQSfeyVL._SY879_.jpg"
                  alt="Bright orange shoes"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://d1x8vd8pvkt0tz.cloudfront.net/1676150/L.jpg"
                  alt="Black and white adidas shoes"
                />
              </div>
              <div className="col-3">
                <img
                  src="https://d1x8vd8pvkt0tz.cloudfront.net/1679781/L.jpg"
                  alt="Woman in an adidas hoodie"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Offer Section */}
        <div className="offer">
          <div className="small-container">
            <div className="row">
              <div className="col-2">
                <img
                  src="https://i.ibb.co/GWc7LPL/flat-lay-of-used-clothing-to-sell-1-e1613970052209-removebg-preview.png"
                  className="offer-img"
                  alt="Sell Now"
                />
              </div>
              <div className="col-2">
                <p>Exclusively Available on The Thrift Project</p>
                <h1>Thrift Your Clothes Now!</h1>
                {/* <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, sapiente accusamus!</small> */}
                <a href="https://forms.gle/WU7N8vofL9jZ88Yg7" className="btn">
                  Sell Now &#8594;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonial">
          <div className="small-container">
            <div className="row">
              <div className="col-3">
                <i className="fa fa-quote-left"></i>
                <p>
                  Love the variety and quality. Found some unique pieces at great
                  prices. Will shop again!
                </p>
                <div className="rating">
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                </div>
                <img
                  src="https://i.ibb.co/z2PSDhq/user-3.png"
                  alt="Tanisha Sharma"
                />
                <h3>Tanisha Sharma</h3>
              </div>

              <div className="col-3">
                <i className="fa fa-quote-left"></i>
                <p>
                  Affordable prices and cool items. Shipping took a bit, but the
                  quality made up for it.
                </p>
                <div className="rating">
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                </div>
                <img
                  src="https://i.ibb.co/374mhsX/user-2.png"
                  alt="Rishi Mehta"
                />
                <h3>Rishi Mehta</h3>
              </div>

              <div className="col-3">
                <i className="fa fa-quote-left"></i>
                <p>
                  Perfect for sustainable fashion lovers. Found a beautiful dress
                  that fits perfectly!
                </p>
                <div className="rating">
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                  <i className="fa fa-star">⭐</i>
                </div>
                <img
                  src="https://i.ibb.co/t20fqmv/user-1.png"
                  alt="Taruna Jain"
                />
                <h3>Taruna Jain</h3>
              </div>
              {/* Add more testimonials similarly */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
