import React, { useState, useEffect } from "react";
import "./HomeStyle.css";
import BurgerListComponent from "../burger/BurgerListComponent";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Primary image sources (direct links to burger images)
  const images = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80",
  ];

  // Fallback images in case primary ones fail
  const fallbackImages = [
    "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/03/05/20/02/hamburger-1239081_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg",
  ];

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(
          images.map((image) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = image;
              img.onload = resolve;
              img.onerror = () => {
                console.warn(`Failed to preload image: ${image}`);
                reject();
              };
            });
          })
        );
        setLoading(false);
      } catch (err) {
        console.error("Error loading images:", err);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageError = (e, index) => {
    console.warn(`Image failed to load, using fallback: ${images[index]}`);
    e.target.src = fallbackImages[index];
    e.target.onerror = null;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center m-5">
        <h5>{error.message}</h5>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Carousel Section */}
      <section className="hero-section mb-5">
        <div
          id="burgerCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#burgerCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner rounded-3xx shadow-lg overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image}
                  className="d-block w-100 carousel-image"
                  alt={`Burger ${index + 1}`}
                  onError={(e) => handleImageError(e, index)}
                  loading="lazy"
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-4">
                  <h2 className="display-4 fw-bold text-warning">
                    {index === 0 && "Juicy Burgers"}
                    {index === 1 && "Cheesy Goodness"}
                    {index === 2 && "Crispy Chicken"}
                    {index === 3 && "Bacon Delight"}
                  </h2>
                  <p className="lead">
                    Premium ingredients, unforgettable taste
                  </p>
                  <Link to="/burgers" className="btn btn-warning btn-lg mt-3">
                    <i className="fa fa-cutlery mr-2"></i> Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#burgerCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark rounded-circle p-3"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#burgerCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark rounded-circle p-3"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section mb-5 py-4 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 display-5 fw-bold text-danger">
            Why Choose Our Burgers?
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="fa fa-leaf fa-3x text-success mb-3"></i>
                  <h3 className="h4">Fresh Ingredients</h3>
                  <p className="text-muted">
                    Locally sourced, organic produce for the freshest taste.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="fa fa-fire fa-3x text-danger mb-3"></i>
                  <h3 className="h4">Flame-Grilled</h3>
                  <p className="text-muted">
                    Perfectly charred for that authentic smoky flavor.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i className="fa fa-thumbs-up fa-3x text-primary mb-3"></i>
                  <h3 className="h4">100% Satisfaction</h3>
                  <p className="text-muted">
                    Love it or your next meal is on us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Burger List Section */}
      <section className="burger-list-section mb-5">
        <div className="container">
          <BurgerListComponent />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section bg-danger text-white py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-6 fw-bold mb-3">Get Exclusive Deals</h2>
              <p className="lead mb-4">
                Subscribe to our newsletter and get 15% off your first order!
              </p>
              <form className="row g-2 justify-content-center">
                <div className="col-md-8">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg w-100"
                  >
                    <i className="fa fa-paper-plane mr-2"></i> Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
